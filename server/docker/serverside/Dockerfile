FROM node:21.7.1-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app


RUN addgroup app && adduser -S -G app app

COPY --chown=node:node package*.json .
RUN npm install

COPY --chown=node:node . .
USER node


CMD [ "npm", "run", "server" ]
