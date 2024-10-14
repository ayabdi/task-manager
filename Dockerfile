# Use the official Node.js 18 image as base
FROM node:18-alpine AS builder

# Install build tools
RUN apk add --no-cache make gcc g++ python3

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt for the correct architecture
RUN npm rebuild bcrypt --build-from-source

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy node_modules and built application from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma


# Install only production dependencies
RUN npm ci --only=production

# Expose the port your app runs on
EXPOSE 3000

# Set environment variable to production
ENV NODE_ENV=production

# Start the application
CMD [ "npm", "run", "start", "--", "-H", "0.0.0.0" ]