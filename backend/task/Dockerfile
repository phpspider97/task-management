FROM node:alpine
WORKDIR /app
#COPY package*.json ./
COPY . .
RUN npm install 
EXPOSE 3002
CMD ["npm","start"]