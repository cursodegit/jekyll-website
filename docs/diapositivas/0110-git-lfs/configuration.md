## Git LFS: Configuración

Notes:

En esta sección veremos cómo inicializar `git-lfs` en un repositorio

^^^^^^
#### Paso 1: instalación de la extension

```shell
> apt install git-lfs
```

[Ver la documentación](https://github.com/git-lfs/git-lfs#installing) 
para instrucciones en otros sistemas operativos.

Windows: viene instalado con la distribución de git 
(incluido también en Sourcetree)

^^^^^^

#### Paso 2: inicialización

Dentro del repositorio ejecutamos:

```shell
> git lfs install
```

^^^^^^

#### Paso 2: inicialización

- Añade opciones a la configuración global de git

```shell
$ git config --global -l | grep lfs
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
```
- En el repositorio en el que se ejecuta:
	- Añade una sección `[lfs]` la fichero `.git/config`
	- Añade nuevos hooks a la carpeta `.git/hooks`: `post-checkout`,`post-commit`,`post-merge`,`pre-push`

Notes:

Las opciones que se añaden a la configuración global de git inicilizan los filtros
`clean` y `smudge`:
- `smudge` es el encargado de convertir los punteros en los ficheros reales
- `clean` es el encargado de convertir los ficheros en punteros

^^^^^^

#### Paso 2: inicialización

Tras inicializar Git LFS, estamos listos para empezar subir imágenes
