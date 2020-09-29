FROM node:12

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install PM2 globally
RUN npm install pm2 -g

# Install app dependencies
RUN npm install
RUN npm audit fix

COPY . .

RUN npm run build

EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]

# docker run -d \
#       -p 3000:3000 \
#       --name client next-apollo:1.1