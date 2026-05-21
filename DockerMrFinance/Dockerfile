FROM node:24-alpine

# Build tools needed for native modules (bcrypt requires python3, make, g++)
RUN apk add --no-cache python3 make g++

# Global tools for dev workflow
RUN npm install -g nodemon concurrently

WORKDIR /app

# Copy the entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000 5173 8081 587 443 80

ENTRYPOINT ["/entrypoint.sh"]
