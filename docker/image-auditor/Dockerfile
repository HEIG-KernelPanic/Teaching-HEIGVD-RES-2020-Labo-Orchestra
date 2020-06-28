FROM node:12.16.3

WORKDIR /opt/app/

COPY src/ ./

RUN npm install

CMD ["node", "auditor.js"]