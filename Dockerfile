FROM node:18 as build

WORKDIR /app

COPY ./ ./
RUN npm install
RUN npm run build


FROM node:18
ENV APP_PORT=3000

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "run", "start"]