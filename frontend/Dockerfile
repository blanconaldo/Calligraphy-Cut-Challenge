#FROM node:18-alpine
#
#WORKDIR /app
#
#COPY package*.json ./
#COPY pnpm-lock.yaml ./
#
#RUN npm install -g pnpm
#
#RUN pnpm install
#
#COPY . .
#
#EXPOSE 5173
#
## Fix the command to ensure host binding works correctly
#CMD ["sh", "-c", "npx vite --host 0.0.0.0 --port 5173"]

FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .
# Use ARG to pass in the API URL during build
ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

RUN pnpm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]