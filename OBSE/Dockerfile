FROM node
WORKDIR /usr/src/app
COPY package*.json ./
COPY . '/usr/src/app/'
RUN npm install
CMD [ "node", "receive_logs_topic.js" ]