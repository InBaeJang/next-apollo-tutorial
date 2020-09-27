FROM node:12 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm audit fix

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "dev" ]