FROM ruby:3.4.7

ENV DEBIAN_FRONTEND noninteractive
ARG JEKYLL_UID=10001

RUN mkdir -p /usr/src/app && \
  mkdir -p /usr/src/app/node_modules && \  
  mkdir -p /usr/src/app/docker_data && \  
  mkdir -p /gems && \
  adduser --shell /bin/sh --uid $JEKYLL_UID --ingroup root --gecos "" --disabled-password --home /home/jekyll jekyll && \
  chown -R jekyll /usr/src/app /gems && \
  apt update && \
  apt install -yqq locales && \
  apt-get clean && rm -r /var/lib/apt/lists
WORKDIR /usr/src/app

RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
  locale-gen en_US.UTF-8 && \
  dpkg-reconfigure locales && \
  /usr/sbin/update-locale LANG=en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

USER jekyll
ENV BUNDLE_PATH="/gems"
# COPY Gemfile* /usr/src/app/
# RUN bundle install

RUN echo 'require "irb/ext/save-history"' >> ~/.irbrc; \
  echo IRB.conf[:SAVE_HISTORY] = 100 >> ~/.irbrc; \
  echo 'IRB.conf[:HISTORY_FILE] = ENV["HOME"] + "/.irb-history"' >> ~/.irbrc
EXPOSE 4000

VOLUME /gems
VOLUME /usr/src/app/
VOLUME /usr/src/app/node_modules

CMD ["bundle", "exec", "jekyll", "serve"]

