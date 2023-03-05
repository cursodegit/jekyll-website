#!/usr/bin/env bash
docker build -f Dockerfile_production  -t jekyll-website -t eu.gcr.io/web-cursodegit-com/web .
