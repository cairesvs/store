DOCKER_IMAGE_VERSION?=build

dependencies:
	npm install

docker/build:
	docker build -t caires/store-render:${DOCKER_IMAGE_VERSION} .

docker/tag:
	docker tag caires/store-render caires/store-render:${DOCKER_IMAGE_VERSION}

docker/run:
	docker-compose -d up

docker/stop:
	docker-compose down

docker/push:
	docker push caires/store-render:${DOCKER_IMAGE_VERSION}
