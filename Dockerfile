FROM node:14-alpine

# set working directory
WORKDIR /users-bo/src/app

# install app dependencies
COPY package*.json ./
RUN npm install



# add app
COPY . .
RUN npm run build

EXPOSE 3000
# start app
ENTRYPOINT [ "npm", "start"]



