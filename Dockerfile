FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --legacy-peer-deps && mv node_modules ../

COPY . .
RUN npm run build

CMD ["npm", "run", "preview"]