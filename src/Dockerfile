FROM --platform=$BUILDPLATFORM node:14.4.0-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

# This part is from gpt. Need to double check its functionality
# Build the Vue.js application (assuming you have a build script in package.json)
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]