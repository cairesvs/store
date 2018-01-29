FROM node:carbon

WORKDIR /usr/src/app

ENV PG_USER ""
ENV PG_HOST ""
ENV PG_DB ""
ENV PG_PORT ""
ENV ES_HOST ""
ENV ES_LOG ""

COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]