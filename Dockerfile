FROM node:16
EXPOSE 8000
WORKDIR /usr/src
COPY . ./
RUN npm install
