FROM node:12.16.3

# Set workdir
WORKDIR /opt/app

COPY src/ ./

# Install dependencies with npm
RUN npm install

# Run the app
ENTRYPOINT ["node", "musician.js"]
