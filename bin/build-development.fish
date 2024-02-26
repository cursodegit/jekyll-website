#!/usr/bin/env fish
compose_wrapper build --build-arg JEKYLL_UID=(id -u) jekyll
