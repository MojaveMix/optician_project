FROM node:20 AS build

# create working directory
WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files
COPY . .

# expose backend port
EXPOSE 8000

# start server
CMD ["npm", "start"]