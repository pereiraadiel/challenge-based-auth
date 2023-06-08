FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

COPY package.json ./

# Install the dependencies
RUN npm cache clean --force
RUN npm install

# Copy the application code to the container
COPY . .

RUN npm run build

# Expose the port on which the NestJS application will run
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
