FROM node:21-alpine3.18 AS development
# From uses node which was pulled as a base image. We are using alpine because that's what google said to use for vue.
WORKDIR /app
# This sets up the directory for the docker build to run
COPY package*.json ./
# Copies over the package.jsons to install the packages
RUN npm install
# Installs everything
COPY . .
# Copies over everything
ENV PORT=5432
# Sets a port for the build
EXPOSE 5432
# Exposes that port so we can see it from browser and for sql
CMD ["npm", "start", "serve"]
# This is what is executed when we run the image.