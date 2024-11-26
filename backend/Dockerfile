# Dockerfile for Node.js Backend
# Use an official Node.js image as the base image
FROM node:16-alpine
# Set the working directory in the container
WORKDIR /app
# Copy the package.json and package-lock.json (if available) to the container
COPY package*.json ./
# Install dependencies (including 'pg' for Postgres)
RUN npm install
# Copy the rest of your application code to the container
COPY . .
# Expose the port your application will run on
EXPOSE 6000

CMD ["node", "server.js"]

