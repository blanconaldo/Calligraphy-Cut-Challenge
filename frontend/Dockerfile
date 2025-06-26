#FROM node:22-alpine
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
#CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 5173

# Fix the command to ensure host binding works correctly
CMD ["sh", "-c", "npx vite --host 0.0.0.0 --port 5173"]