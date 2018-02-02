# Store API

## Installation

`npm install` and you're good to go.

## How to Run

### Dependencies

`npm install` and you're good to go.

### Docker

- Build the image using `DOCKER_IMAGE_VERSION=CHOOSE_VERSION make docker/build` 
- `docker-compose up`

 *DON'T FORGET TO CHANGE THE VERSION ON docker-compose.yml`

### Local

- Run postgres `make postgres/up`
- Run npm start

### Endpoints

`Add` -> 
```sh
curl -X POST \
  http://localhost:3000/products \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"name": "Sofá ",
	"description": "Sofá lindo",
	"photos": ["http://www.ikea.com/PIAimages/0389161_PE559365_S3.JPG","http://www.ikea.com/PIAimages/0389161_PE559365_S3.JPG","http://www.ikea.com/PIAimages/0389161_PE559365_S3.JPG"],
	"price": 2000,
	"discount": 0,
	"category": "COUCH"
}'
```

`Get` -> 
```sh
curl -X GET \
  'http://localhost:3000/products?id=2' \
  -H 'cache-control: no-cache' 
```

`Search` -> 
```sh
curl -X GET \
  'http://localhost:3000/products/search?q=lindo' \
  -H 'cache-control: no-cache' 
```