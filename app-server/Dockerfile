FROM node:12
WORKDIR /home/node/app
COPY . .
RUN ["npm", "ci"]
EXPOSE 3000
CMD ["npm", "run", "start"]