FROM node:16-slim
ADD . /booklist-react
WORKDIR /booklist-react
RUN npm install
RUN npm run build
RUN npm install -g serve
RUN serve -s build
EXPOSE 3000