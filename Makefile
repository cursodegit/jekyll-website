build:
	docker build -f .\Dockerfile_production  -t jekyll-website -t eu.gcr.io/web-cursodegit-com/web .

push:
	docker push eu.gcr.io/web-cursodegit-com/web:latest

deploy-latest:
	gcloud run deploy web-cursodegit-com --image eu.gcr.io/web-cursodegit-com/web:latest --region=europe-west1 --project web-cursodegit-com