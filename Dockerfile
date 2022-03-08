FROM node:16-slim
ADD . /booklist-react
WORKDIR /booklist-react
RUN npm install
RUN npm install -g serve
RUN npm i react-scripts
EXPOSE 3000