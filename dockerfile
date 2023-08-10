#use node:alpine for base image
FROM node:alpine AS build

# set working directory
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

#install dependencies
RUN npm install

#cop
COPY . .
RUN npm run build

FROM nginx:alpine

#copy build to nginx server
COPY --from=build /app/build /usr/share/nginx/html

#EXPOSE 80

#start server
CMD ["nginx","-g","daemon off:"]
