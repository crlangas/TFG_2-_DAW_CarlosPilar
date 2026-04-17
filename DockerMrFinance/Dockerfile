FROM node:24-alpine

# Instalar nodemon globalmente para hot-reload
RUN npm install -g nodemon

WORKDIR /app

# Copiar el entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
