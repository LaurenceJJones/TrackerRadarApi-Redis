FROM node:12-alpine

WORKDIR /usr/share/app

COPY package* ./

RUN npm install

COPY . ./

CMD ["npm" , "start"]