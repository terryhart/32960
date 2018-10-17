FROM node:10-alpine

ENV DEBUG=off \
  NODE_ENV=production \
  APP_PORT=1024

RUN mkdir app
WORKDIR /app
COPY . /app/

RUN NODE_ENV=production yarn install

# Start
CMD npm run server