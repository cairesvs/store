DOCKER_IMAGE_VERSION?=build
PG_NAME?=local-postgres
PG_PORT?=5433
PG_TEST_NAME?=test-postgres
PG_TEST_PORT?=5444

postgres/up:
	docker run --name $(PG_NAME) -v ${PWD}/sql:/docker-entrypoint-initdb.d/ -p $(PG_PORT):5432 -d postgres

postgres/down:
	docker rm -f $(PG_NAME)

postgres/test/up:
	docker run --name $(PG_TEST_NAME) -v ${PWD}/sql:/docker-entrypoint-initdb.d/ -p $(PG_TEST_PORT):5432 -d postgres

postgres/test/down:
	docker rm -f $(PG_TEST_NAME)

postgres/connect:
	docker run -it --rm --link $(PG_NAME):postgres postgres psql -h postgres -U postgres

test:
	$(MAKE) postgres/test/up
	sleep 5
	-npm test
	$(MAKE) postgres/test/down

dependencies:
	npm install

run:
	npm run build && npm start

docker/build:
	docker build -t caires/store-api:${DOCKER_IMAGE_VERSION} .

docker/tag:
	docker tag caires/store-api caires/store-api:${DOCKER_IMAGE_VERSION}

docker/run:
	docker-compose -d up

docker/stop:
	docker-compose down

docker/push:
	docker push caires/store-api:${DOCKER_IMAGE_VERSION}
