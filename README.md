# jekyll-website


# Desarrollo

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
