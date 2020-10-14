FROM node:alpine as builder 
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# Copy build files and drop node container

FROM nginx
# Here we copy the files generated in the build step of the previous container
# We copy them into /usr/share/nginx/html (the DIR that nginx serves static content)
COPY --from=builder ./app/build /usr/share/nginx/html

# the nginx container has a predefined RUN command so no additional commands
# are needed