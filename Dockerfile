# Use an official Node.js runtime as a parent image
FROM node:lts

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set the working directory
WORKDIR /app

# Copy the package.json file into the Docker container
COPY frontend/package.json .

# Install dependencies
RUN npm install

# Copy the contents of the frontend directory into the Docker container
COPY frontend/ .

# Start the Angular development server
CMD ["ng","serve","--host", "0.0.0.0"]
