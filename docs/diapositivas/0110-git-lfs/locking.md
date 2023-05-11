## Git LFS: Bloqueo de ficheros

Notes:

`git-lfs` tiene una API a nivel de servidor que permite implementar bloqueo de ficheros.
En esta sección veremos cómo funciona.

^^^^^^

#### Motivación

Facilitar el trabajo concurrente

Notes:

Git es un sistema de control de versiones distribuido. Al no exitir un servidor
centralizado que coordine el acceso a los ficheros, no es posible controlar
la concurrencia. `git-lfs` implementa una API en el servidor remoto que 
permite indicar a los clientes que quieren bloquear un fichero. De esta forma,
cuando un usuario hace intenta hacer push de un fichero gestionado por 
`git-lfs` que está bloqueado, recibe un aviso de que existe un bloqueo.

<!-- TODO: añadir un diagrama sobre cómo funciona un bloqueo -->

^^^^^^

#### Bloquear un fichero

Indicarle a `git-lfs` qué ficheros se pueden bloquear:

```shell
> git lfs track "*.jpg" --lockable
```
O añadir la opción manualmente al fichero `.gitattributes`

```text
*.jpg filter=lfs diff=lfs merge=lfs -text lockable
```
Notes:

El comando indicado en esta diapositiva añade la opción `lockable` a 
la correspondiente línea en el fichero `.gitattributes`.

Es posible activar el bloqueo de ficheros sin necesidad de que estos
estén gestionados por `git-lfs`. Basta añadir la opción al fichero 
`.gitattributes`

```text
*.yml lockable
```

^^^^^^

#### Bloquear un fichero 

```shell
> git lfs lock imagenes/tigre.jpg
```

^^^^^^

#### Listar ficheros bloqueados

```shell
> git lfs locks
imagenes/leon.jpg  fulanito   ID:123
imagenes/tigre.jpg  menganito  ID:456
```

^^^^^^

#### Desbloquear un fichero 

```shell
> git lfs unlock imagenes/tigre.jpg
> git lfs unlock --id=456
```

Usar `--force` para desbloquear un fichero que no 
hayamos bloqueado nosotros

^^^^^^

#### Requisitos

El servidor remoto debe implementar la API de bloqueo 

```shell
$ git lfs push origin master --all
Remote "origin" does not support the LFS locking API. Consider disabling it with:
  $ git config 'lfs.http://git-server.com/user/test.locksverify' false
Git LFS: (0 of 0 files, 7 skipped) 0 B / 0 B, 879.11 KB skipped
```
