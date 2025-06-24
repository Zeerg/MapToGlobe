# Use Node.js 16 LTS to avoid OpenSSL compatibility issues with Vue CLI 4.5.0
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port 8080
EXPOSE 8080

# Set environment variables for development
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true

# Start development server
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--port", "8080"] 