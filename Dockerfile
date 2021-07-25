# syntax=docker/dockerfile:1

FROM node:12.21.0

ENV NODE_ENV=production

WORKDIR /app

# This allows us to take advantage of cached Docker layers
COPY package*.json ./

RUN npm install --production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]