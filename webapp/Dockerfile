FROM node:16-alpine

#update environment
RUN apt-get -y upgrade
RUN apt-get -y update
RUN apt-get -y --with-new-pkgs upgrade
RUN apt-get -y autoremove

#install chrome
RUN apt-get -y install lsb-release libappindicator3-1
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb || true
RUN apt-get -fy install

# Create app directory
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run","start" ]