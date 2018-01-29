DOCKER_IMAGE_VERSION?=build
PG_NAME?=local-postgres
PG_PORT?=5433
ES_NAME?=local-es
ES_PORT?=9201
ES_PORT_NODE?=9301

postgres/up:
	docker run --name $(PG_NAME) -v ${PWD}/sql:/docker-entrypoint-initdb.d/ -p $(PG_PORT):5432 -d postgres

postgres/down:
	docker rm -f $(PG_NAME)

postgres/connect:
	docker run -it --rm --link $(PG_NAME):postgres postgres psql -h postgres -U postgres

elasticsearch/up:
	docker run --name $(ES_NAME) -p $(ES_PORT):9200 -p $(ES_PORT_NODE):9300 -e "discovery.type=single-node" -d docker.elastic.co/elasticsearch/elasticsearch:6.1.2

elasticsearch/down:
	docker rm -f $(ES_NAME)

dependencies:
	npm install

run:
	npm run build && PG_USER=postgres PG_HOST=127.0.0.1 PG_DB=postgres PG_PORT=$(PG_PORT) ES_HOST=127.0.0.1:$(ES_PORT) ES_LOG=trace npm start

test:
	$(MAKE) postgres/up PG_NAME=test-local PG_PORT=5555
	sleep 5
	PG_CONNECTION="user=postgres host=localhost dbname=postgres port=5555 sslmode=disable" go test -v $(TESTS)
	$(MAKE) postgres/down PG_NAME=test-local	

docker/build:
	docker build -t caires/mmartan:${DOCKER_IMAGE_VERSION} .

docker/tag:
	docker tag caires/mmartan caires/mmartan:${DOCKER_IMAGE_VERSION}

docker/run:
	docker run -ti -p 8000:8000 --rm caires/beeru:${DOCKER_IMAGE_VERSION}

docker/run/local:
	docker build -t caires/beeru:build -f Dockerfile.build .
	docker run --rm --entrypoint /bin/sh -v ${PWD}:/out:rw caires/beeru:build -c "cp /go/bin/beeru /out/beeru"
	docker build -t caires/beeru:local .
	docker run --name postgis -v ${PWD}/sql:/docker-entrypoint-initdb.d/ -e POSTGRES_PASSWORD=123 -d mdillon/postgis
	docker run -ti --link postgis:postgis -p 8000:8000 -e "PG_CONNECTION=user=postgres dbname=postgres sslmode=disable password=123 host=postgis" --rm caires/beeru:local

docker/stop/local:
	docker rm -f postgis

docker/push:
	docker push caires/mmartan:${DOCKER_IMAGE_VERSION}
