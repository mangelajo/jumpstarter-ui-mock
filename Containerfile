# Use Fedora 42 as base image
FROM fedora:42

# Set working directory
WORKDIR /app

# Install Node.js and npm
RUN dnf update -y && \
    dnf install -y nodejs npm && \
    dnf clean all

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Set environment variable to suppress deprecation warnings
ENV NODE_OPTIONS="--no-deprecation"

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]
