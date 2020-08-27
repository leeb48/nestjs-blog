FROM node:alpine as dev
WORKDIR '/app'
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine as prod
WORKDIR '/app'
COPY ./package*.json ./
RUN npm install --only=production
COPY --from=dev /app/dist ./dist
CMD ["node", "dist/main"]