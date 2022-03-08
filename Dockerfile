FROM node:16-slim
ADD . /booklist-react
WORKDIR /booklist-react
RUN npm install
RUN npm run build
EXPOSE 3000