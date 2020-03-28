FROM node:10.13.0-alpine

# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
COPY tsconfig.json .
COPY package-lock.json .
COPY darkedges-auth-firebase-adminsdk-co689-f9dbf84017.json .
COPY ./src ./src
# Install all Packages
RUN npm install
# TypeScript
RUN npm run build
# Start
CMD [ "npm", "start" ]