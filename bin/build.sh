#!/usr/bin/env bash
podman build -f Dockerfile_production -t jekyll-website -t eu.gcr.io/web-cursodegit-com/web .
