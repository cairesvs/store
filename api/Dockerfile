FROM node:carbon

WORKDIR /usr/src/app

ENV PG_USER ""
ENV PG_HOST ""
ENV PG_DB ""
ENV PG_PORT ""
ENV ES_HOST ""
ENV ES_LOG ""
ENV NODE_ENV "production"

COPY package*.json ./
COPY . .
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]