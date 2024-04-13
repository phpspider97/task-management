FROM node:alpine
WORKDIR /app
#COPY package*.json ./
COPY . .
RUN npm install 
EXPOSE 3003
CMD ["npm","start"]