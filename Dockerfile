FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json ./
COPY tsconfig.json ./
COPY ./ ./
RUN npm install && npm run build
EXPOSE 5155
EXPOSE 27017
CMD [ "npm", "start"]