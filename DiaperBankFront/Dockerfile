FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli --unsafe

COPY . .


CMD ng serve --host 0.0.0.0