# Use Node.js LTS (Long Term Support) version as base image for building the app
FROM node:lts-alpine AS builder

# Set working directory inside the container for the server
WORKDIR /app

# Copy server package.json and package-lock.json
COPY package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of the server application code
COPY . .

# Build the client (assuming React application)
WORKDIR /app/client

# Install client dependencies
RUN npm install

# Build the client application
RUN npm run build

# Start a new stage for the final production image
FROM node:lts-alpine

# Set working directory inside the container
WORKDIR /app

# Copy server package.json and package-lock.json
COPY package*.json ./

# Install server production dependencies only
RUN npm install --only=production

# Copy server code from the builder stage
COPY --from=builder /app .

# Copy client build from the builder stage
COPY --from=builder /app/client/build ./client/build

# Expose server port
EXPOSE 3001

# Command to run the server
CMD ["node", "index.js"]
