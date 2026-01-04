FROM node:20-slim
WORKDIR /app

RUN apt update && apt install -y default-mysql-client && rm -rf /var/lib/apt/list*

COPY package.json package-lock.json* ./
RUN npm ci

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "dev"]
