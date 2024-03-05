FROM node:20
WORKDIR /myserver
COPY  package.json .
RUN npm install
COPY  . .
EXPOSE 4000
CMD [ "npm", "start" ]

#docker build -t myserver .
#docker run -p 4000:4000 server
#docker pw
#docker stop id