#!/usr/bin/env bash
gcloud run deploy web-cursodegit-com-podman --image europe-west1-docker.pkg.dev/web-cursodegit-com/jekyll-website/jekyll-website:latest  --region=europe-west1 --project web-cursodegit-com --min-instances=1 --max-instances=10
