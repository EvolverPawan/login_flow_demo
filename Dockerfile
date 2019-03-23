FROM node:10.10.0
# WORKDIR specifies the directory our
# application's code will live within
WORKDIR /app
COPY backend/package.json /app
# We then run npm install to install
RUN npm install

# We then copy the rest of our application
# to the app direcoty
COPY . /app
CMD ["bash", "-c", "cd backend/ && npm run dev"]