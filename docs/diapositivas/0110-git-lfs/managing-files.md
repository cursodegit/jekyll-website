## Git LFS: Gestionando ficheros

Notes:

Una vez inicializado, podemos empezar a anadir ficheros 
y gestionarlos a través de `git-lfs`

^^^^^^

#### Siguiendo ficheros

Utilizar el comando `git lfs track` para seguir ficheros:

```shell
> git lfs track "*.psd"

> git lfs track bigfile.psd

> git lfs track --filename "bigfile-asd*34f.psd"
```

Notes:

Usando el comando `git lfs track` le indicamos a Git LFS qué ficheros queremos
que se encargue de seguir.

La opción `--filename` hace que los caracteres del nombre del fichero no se interpreten
usando un _shell blob expansion_ y se escapen correctamente en el fichero`
`.gitattributes`.

^^^^^^

#### Siguiendo ficheros

`git lfs track` añade los ficheros al fichero `.gitattributes`:

```.gitattributes
*.psd filter=lfs diff=lfs merge=lfs -text
bigfile.psd filter=lfs diff=lfs merge=lfs -text
bigfile-asd\*34f.psd filter=lfs diff=lfs merge=lfs -text
```

^^^^^^

#### Siguiendo ficheros

Hacemos un commit con los ficheros que queremos seguir

**¡incluyendo .gitattributes!**

```shell
> git add *.psd .gitattributes
> git commit -m'Añade fichero psd a través de Git LFS'
```

^^^^^^

#### Siguiendo ficheros

Subimos los ficheros al remoto usando `git push`:

```shell 
> git push
Uploading LFS objects: 100% (2/2), 124.7 MB | 0 B/s, done.
Enumerating objects: 8, done.
Counting objects: 100% (8/8), done.
Delta compression using up to 8 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 797 bytes | 797.00 KiB/s, done.
Total 6 (delta 2), reused 0 (delta 0), pack-reused 0
```

Notes:

Al hacer push, vemos que el primer paso es subir los ficheros a Git LFS:

```shell
Uploading LFS objects: 100% (1/1), 4.7 MB | 0 B/s, done.
```

Después de subir los ficheros, se continúa con la ejecución estándar
del comando push.
