# Store

Store is a project that's contains the an API and render for create, search products.

[Docker API](https://hub.docker.com/r/caires/store-api/)
[Docker Render](https://hub.docker.com/r/caires/store-api/)

## Architecture 

### Overview

The project have two entrypoints: API and Render. 
The API is a mix of `public API` with backoffice capabilities like create, read, search. With this approach in the future we can deploy in a private VPC and only expose publicly the read endpoints.
The Render is responsible only for the rendering part, server side and client side. The main goal here is to achieve isomorphic behaviour to ease the improvements on the SEO and perfomance part.

### API

For the language I used Typescript with [express](https://github.com/expressjs/express) and for database [node-postgres](https://github.com/brianc/node-postgres).
[winston](https://github.com/winstonjs/winston) to create structured log and docker for container.
[mocha](https://github.com/mochajs/mocha) for testing and [chai](https://github.com/chaijs/chai) for assertion.

#### TODO

 - [ ] Monitoring(Prometheus, Newrelic, ect...)
 - [ ] Transaction ID to trace requests via log

### Render

For the language I used Typescript with [express](https://github.com/expressjs/express) and [react](https://github.com/facebook/react).
[jest](https://github.com/facebook/jest) to testing snapshots of components.

#### TODO

 - [x] Make jest work perfectly
 - [ ] CircleCI 

## Installation

[API](api/README.md#installation)

[Render](render/README.md#installation)

## How to run

[API](api/README.md#how-to-run)

[Render](render/README.md#how-to-run)
