FROM node:alpine

RUN mkdir -p /usr/node/app
WORKDIR /usr/node/app

COPY package.json /usr/node/app/
RUN npm install

COPY . /usr/node/app

EXPOSE 3030

CMD ["npm", "start"]