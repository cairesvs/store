DOCKER_IMAGE_VERSION?=build
PG_NAME?=local-postgres
PG_PORT?=5433

postgres/up:
	docker run --name $(PG_NAME) -v ${PWD}/sql:/docker-entrypoint-initdb.d/ -p $(PG_PORT):5432 -d postgres

postgres/down:
	docker rm -f $(PG_NAME)

postgres/connect:
	docker run -it --rm --link $(PG_NAME):postgres postgres psql -h postgres -U postgres

dependencies:
	npm install

docker/build:
	docker build -t caires/mmartan:${DOCKER_IMAGE_VERSION} .

docker/tag:
	docker tag caires/mmartan caires/mmartan:${DOCKER_IMAGE_VERSION}

docker/run:
	docker-compose -d up

docker/stop:
	docker-compose down

docker/push:
	docker push caires/mmartan:${DOCKER_IMAGE_VERSION}
