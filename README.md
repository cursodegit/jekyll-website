# jekyll-website


## Desarrollo - docker

Para desarrollar la web o escribir artículos en el blog utilizaremos docker.

* Clona el repositorio
```bash
> git clone git@github.com:cursodegit/jekyll-website.git
```

* Construye la imagen.
  * Si estás usando Docker for Mac, ejecuta
    ```bash
    > docker-compose build
    ```
  * Si estás usando Linux o Docker for Windows con WSL2 (manera recomendada de hacerlo en windows 10):
    * Averigua dentro de WSL o de tu distribución de Linux cuál es el ID de tu usuario:
      ```bash
      # Para ubuntu puedes usar, por ejemplo:
      > id -u
      1000
      ```
    * Construye la imagen utilizando este ID de usuario para el usuario de jekyll dentro del controlador:
      ```bash
      > docker-compose build --build-arg JEKYLL_UID=1000
      ```
      o 
      ```bash
      > bin/build-development.sh
      ```
* Inicializa las gemas
```bash
> docker-compose run --rm jekyll bundle install
```
* Levanta el servicio
```bash
> docker-compose up
```
* Accede a la web apuntando tu navegador a `localhost:4000`

## Despliegue

Actualmente el sitio está desplegado en Cloud Run.

Instalar `google-cloud-cli` siguiendo [las documentación de Google](https://docs.cloud.google.com/sdk/docs/install-sdk).

Una vez instalado, ejecutar `gcloud init` para autenticarte y seleccionar el proyecto de GCP. En este caso `web-cursodegit-com`.

Configurar gcloud como helper the atenticación para docker:

```bash
gcloud auth configure-docker europe-west1-docker.pkg.dev
```

Nota: Es necesario seleccionar una región que tenga soporte para Domain Mappings. En este caso `europe-west1`.

Si estamos usando `podman`, copiar el siguiente fichero:

```bash
cp ~/.docker/config.json ~/.config/containers/
```

Ejecutar el comando `podman login` para autenticarse en el repositorio de contenedores:

```bash
podman login europe-west1-docker.pkg.dev
```

Antes de hacer push de la imagen, asegurarse de que existe el repositorio `jekyll-website` en Arifact Registry. Sin no existe, crearlo con el siguiente comando:

```bash
gcloud artifacts repositories create jekyll-website --repository-format=docker --location=europe
```

Finalmente, construir la imagen y hacer push a Artifact Registry usando los scripts en la carpeta `bin`:

```bash
./bin/build.sh
./bin/push.sh
```

y desplegar en Cloud Run:

```bash
./bin/deploy-latest.sh
```
