FROM node:lts-alpine3.16

WORKDIR /app/backend

COPY package.* ./

RUN npm install

COPY . /app/backend/ 

CMD ["npm","start"]