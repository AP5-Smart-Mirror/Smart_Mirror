### CONFIG BACK ###
FROM arm32v7/node:12-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./* ./
EXPOSE 3000
CMD ["node", "app.js"]
