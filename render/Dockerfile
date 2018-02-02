FROM node:carbon

WORKDIR /usr/src/app

ENV NODE_ENV "production"

COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build:prod

EXPOSE 3000
CMD [ "npm", "start" ]