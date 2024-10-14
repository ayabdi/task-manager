# Use the official Node.js 18 image as base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
ENV NODE_ENV=production
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]