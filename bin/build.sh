#!/usr/bin/env bash
podman build -f Dockerfile_production -t jekyll-website -t europe-west1-docker.pkg.dev/web-cursodegit-com/jekyll-website/jekyll-website:latest .
