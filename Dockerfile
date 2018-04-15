FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false app &&\
    npm install --global npm@5.8.0

ENV HOME=/home/app

COPY ./src/package.json $HOME/joule/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/joule
RUN npm install --silent --progress=false

USER root
COPY ./src/. $HOME/joule
RUN chown -R app:app $HOME/*
USER app

CMD [ "npm", "start" ]
