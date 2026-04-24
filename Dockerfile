FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    pango-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    python3

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
