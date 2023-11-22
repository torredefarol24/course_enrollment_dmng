# FROM node:18.16.0-alpine3.17
# RUN mkdir -p /opt/app
# WORKDIR /opt/app
# COPY package.json ./
# COPY tsconfig.json ./
# COPY ./ ./
# RUN npm install
# EXPOSE 5155
# CMD [ "npm", "start"]