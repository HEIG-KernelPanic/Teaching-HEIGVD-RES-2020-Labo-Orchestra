FROM node:14

RUN apt-get update && apt-get install -y vim
COPY src/ /opt/app

# Create directory for the app
WORKDIR /opt/app

# Install dependencies with npm
RUN npm install

# Run the app
CMD ["node", "index.js"]
