#!/usr/bin/env bash
gcloud run deploy web-cursodegit-com --image eu.gcr.io/web-cursodegit-com/web:latest --region=europe-west1 --project web-cursodegit-com --min-instances=1 --max-instances=10
