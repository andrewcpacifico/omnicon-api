FROM node:13.8.0-buster-slim

ENV CODE /usr/src/app

RUN mkdir -p $CODE

WORKDIR $CODE
