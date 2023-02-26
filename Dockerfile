FROM node:18-slim
WORKDIR /sakura

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm","start"]
