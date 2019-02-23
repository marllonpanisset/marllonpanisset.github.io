FROM ubuntu:14.04

RUN apt-get update -y

RUN apt-get update -y --fix-missing

RUN apt-get install git -y

RUN apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev g++ -y

RUN apt-get install python-software-properties -y

RUN apt-get install curl -y

RUN apt-get install build-essential -y

RUN apt-get install g++ -y

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

RUN apt-get install nodejs -y

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -y

RUN apt-get install yarn

RUN yarn global add npm

# RUN echo "export PATH=/.npm-global/bin:/vagrant/frontend/node_modules/.bin/:/home/vagrant/.yarn/bin/:\$PATH" >> /home/vagrant/.profile
# RUN echo "cd /vagrant" >> /home/vagrant/.profile

RUN npm install -g pug
RUN yarn global add gulp-cli node-sass
RUN yarn install

RUN npm rebuild node-sass

RUN mkdir /app

WORKDIR /app

CMD [ "gulp", "serve" ]