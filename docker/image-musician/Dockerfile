FROM node:14

RUN apt-get update && apt-get install -y vim
COPY src/ /opt/app
WORKDIR /opt/app
RUN npm install

CMD ["node", "index.js"]
