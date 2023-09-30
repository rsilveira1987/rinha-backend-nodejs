FROM node:18.17
WORKDIR /code
RUN apt-get update && apt-get install -y nano vim
# COPY ./app .
RUN npm init -y
RUN npm install -g express
RUN npm install -g nodemon
EXPOSE 3000
CMD [ "node" , "server.js" ]
