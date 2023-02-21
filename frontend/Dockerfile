FROM node:lts-alpine3.16

WORKDIR /app/frontend

COPY package.* ./

RUN npm install

COPY . /app/frontend/ 

CMD ["npm", "run", "start"]