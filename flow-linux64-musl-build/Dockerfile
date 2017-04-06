FROM node:6.9.4-alpine

ARG FLOW_TAG

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && apk --no-cache add \
     alpine-sdk \
     ocaml \
     ocamlbuild \
     libelf \
     libelf-dev \
     ncurses \
     inotify-tools \
     linux-headers \
     git \
     bash \
     diffutils

RUN npm install -g yarn
RUN git clone --depth 1 https://github.com/facebook/flow.git /tmp/flow \
  && cd /tmp/flow \
  && yarn
RUN cd /tmp/flow && make
