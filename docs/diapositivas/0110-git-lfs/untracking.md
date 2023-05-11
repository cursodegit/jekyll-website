## Git LFS: Untracking

Notes:

En esta sección veremos cómo podemos dejar de seguir ficheros en `git-lfs`

^^^^^^

#### Untracking

Ejecutar el comando `git lfs untrack`

```shell
> git lfs untrack imagenes/guepardo.jpg
```

Eliminar el fichero del `index` de git:

```shell
> git rm --cached imagenes/guepardo.jpg
```

Commit y push de los cambios

^^^^^^

#### Untracking 

`git lfs untrack` sólo actua sobre patrones y nombres de ficheros

**que están definidos en `.gitattributes`** 


