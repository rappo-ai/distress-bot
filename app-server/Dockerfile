FROM node:12
ENV NODE_ENV=development
WORKDIR /home/node/app
COPY . .
RUN ["npm", "ci"]
EXPOSE 3000
CMD ["npm", "run", "start"]
