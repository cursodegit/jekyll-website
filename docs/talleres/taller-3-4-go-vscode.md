---
layout: lab
title: "Taller 3.4: Creación y borrado de ramas locales"
---

# Taller 3.4 (version Go con Visual Studio Code): Creación y borrado de ramas locales

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descarga 
- [go/github-client-taller-3-4.zip &#x1F4E5; ]({% link assets/zipfiles/talleres/go/github-client-taller-3-4.zip %})

## Requisitos

Este taller es continuación del taller 
[Taller 3.2: crear etiquetas y ramas]({% link docs/talleres/taller-3-2-go-vscode.md %}) (el taller 3.3 no tiene fichero descargable) .

Es necesario haber completado el 
[taller 3.2]({% link docs/talleres/taller-3-2-go-vscode.md %}) para poder realizar 
este taller. Puedes importar el proyecto [`go/github-client-taller-3-2.zip`]({% link assets/zipfiles/talleres/go/github-client-taller-3-2.zip %})  en 
`Visual Studio Code` y partir de él para hacer este taller.

## Objetivos

- Crear ramas locales
- Borrar ramas locales

{% include alert_box.html content="Si vas a realizar el taller utilizando Sourcetree y la consola, recuerda que no puedes tener dos ramas con el mismo nombre. Necesitarás utilizar nombres diferentes para las ramas, como por ejemplo un prefijo <code>sourcetree/</code> y <code>consola/</code>" %}

## Utilizando `Sourcetree`

### Crear una rama apuntando a la misma confirmación a la que apunta `main`

Seleccionamos la confirmación sobre la que queremos crear la rama y hacemos clic en el botón derecho.
Se desplegará el menú contextual y seleccionaremos *Branch...*:

![Crear rama en Sourcetree Botón derecho paso 1]({% link assets/img/talleres/go/crear-rama-sourcetree-boton-derecho-paso-1.png %})

En el cuadro de diálogo que se abre, seleccionaremos el nombre de la rama (`master`) y nos aseguramos
de que la opción *Checkout New Branch* **no está marcada**, como se indica en la siguiente captura:

![Crear rama en Sourcetree Botón derecho paso 2]({% link assets/img/talleres/go/crear-rama-sourcetree-boton-derecho-paso-2.png %})

En siguientes talleres hablaremos de `HEAD` y de cómo cambiar la rama activa. En ese momento veremos qué hace esta opción.

Hacemos clic sobre el botón _Create Branch_ y veremos que la rama se ha creado correctamente:

![Crear rama en Sourcetree Botón derecho paso 3]({% link assets/img/talleres/go/crear-rama-sourcetree-boton-derecho-paso-3.png %})

### Crear una segunda rama 

Vamos a crear una segunda rama, esta la crearemos en la primera confirmación de cambios que hicimos al 
empezar el curso. En este caso, crearemos la rama de una manera diferente: utilizando el botón _Branch_ del menú
superior de `Sourcetree`, para ver cómo funciona.

Hacemos clic sobre el botón _Branch_ que está en el menú superior. En el cuadro de diálogo que nos aparece,
introducimos el nombre de la rama (`primer-commit`) y desmarcamos la opción _Checkout New Branch_. Antes de continuar
seleccionamos dónde crear la rama. Para ello, hacemos clic sobre el botón con los tres puntos junto a la opción 
*Specified commit*:

![Crear rama en Sourcetree Botón branch paso 1]({% link assets/img/talleres/go/crear-rama-sourcetree-boton-branch-paso-1.png %})

En el cuadro de diálogo que se abre, seleccionamos la primera confirmación de cambios y a continuación hacemos clic 
sobre el botón _OK_:

![Crear rama en Sourcetree Botón branch paso 2]({% link assets/img/talleres/go/crear-rama-sourcetree-boton-branch-paso-2.png %})

Tras hacer clic en _Ok_, volvemos al primer cuadro de diálogo. Vemos que el campo *Specified commit* contiene
el *checksum* de la confirmación que acabamos de seleccionar. Hacemos clic sobre el botón *Create Branch* para crear
la rama:


![Crear rama en Sourcetree Botón branch paso 3]({% link assets/img/talleres/go/crear-rama-sourcetree-boton-branch-paso-3.png %})

Podemos ver la nueva rama en la sección _Branches_ el menú izquierdo y el el log:

![Crear rama en Sourcetree Botón branch paso 4]({% link assets/img/talleres/go/crear-rama-sourcetree-boton-branch-paso-4.png %})

### Crear una tercera rama 

Siguiendo cualquiera de los métodos anteriores, creamos una tercera rama que llamaremos `prueba`, apuntando también 
a la primera confirmación de cambios:

![Crear tercera rama en Sourcetree]({% link assets/img/talleres/go/crear-rama-sourcetree-tercera-rama.png %})

### Borrar la rama `prueba`

Para borrar la rama prueba, nos tenemos que asegurar de que `prueba` no es la rama activa. Veremos más adelante
qué es esto de la rama activa. Si por cualquier motivo, al seguir los pasos anteriores, has acabado con 
`prueba` siendo la rama activa (la rama activa aparece en negrita y con un punto blanco en el menú izquierdo), haz doble
clic sobre la rama `main` (para hacerla la rama activa) antes de continuar.

En la sección *Branches* del menú izquierdo, hacemos clic con el botón derecho sobre `prueba`. En el menú contextual
seleccionaremos la opción *Delete prueba*:

![Borrar rama en Sourcetree paso 1]({% link assets/img/talleres/go/borrar-rama-sourcetree-paso-1.png %})

Se abriará un cuadro de diálogo para confirmar la operación. Le damos a _Ok_, tras lo cual la rama prueba habrá desaparecido:

![Borrar rama en Sourcetree paso 2]({% link assets/img/talleres/go/borrar-rama-sourcetree-paso-2.png %})

## Utilizando la consola

### Crear una rama a la misma altura de `main`

Para crear las ramas sin que se conviertan en la rama activa, utilizaremos el comando `git branch`.

Creamos una rama `master` apuntando a la misma confirmación a la que apunta `main`. El comando `git brach`
acepta dos argumentos:
- el primero es el nombre de la nueva rama
- el segundo es la confirmación a la que queremos que apunte

El segundo argumento (dónde queremos que apunte) acepta una referencia, lo que significa que podemos poner
el *checksum* de un _commit_, el nombre de otra rama o el nombre de una etiqueta por ejemplo. En nuestro
caso, como queremos que `master` apunte a la misma confirmación que `main`, ejecutamos:

```shell 
> git branch master main
```

Si miramos el log de `git` veremos la nueva rama, junto a `main` y las etiquetas, apuntando a la última
confirmación de cambios:

```shell 
> git log --oneline --graph --all
* 0206c90 (HEAD -> main, tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 Esqueleto del proyecto
```

Podemos ver que se ha creado el fichero `.git/ref/heads/main`:

```shell 
> ls .git/refs/heads/
main master 
```


### Crear una segunda rama 

Vamos a crear una segunda rama que llamaremos `primer-commit`. Esta rama la crearemos en la primera confirmación 
de cambios que hicimos al empezar el curso. En este caso, vamos a utilizar el *checksum* de la primera confirmación como 
segundo argumento, que en mi caso es:

```shell
> git branch primer-commit d5ee988
```

Usando el comando `git log` podemos ver la nueva rama apuntando a la primera confirmación de cambios:

```shell
> git log --oneline --graph --all

* 0206c90 (HEAD -> main, tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```

### Crear una tercera rama 

Creamos una tercera rama que llamaremos `prueba`, apuntando también 
a la primera confirmación de cambios:

```shell
> git branch prueba d5ee988
```

Usando el comando `git log` podemos ver la nueva rama apuntando a la primera confirmación de cambios:

```shell
> git log --oneline --graph --all

* 0206c90 (HEAD -> main, tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (prueba, primer-commit) Esqueleto del proyecto
```

Podemos ver todas las ramas que hemos creado utilizando el comando `git branch`

```shell 
> git branch
* main
  master
  primer-commit
  prueba
```

Si queremos ver a qué confirmación apunta cada una de ellas podemos usar la opción `-v`:

```shell 
> git branch -v

* main          0206c90 Comando raiz usando cobra
  master        0206c90 Comando raiz usando cobra
  primer-commit d5ee988 Esqueleto del proyecto
  prueba        d5ee988 Esqueleto del proyecto
```

Si miramos el contenido de la carpeta `.git/refs/heads/` veremos los ficheros correspondientes a las ramas:

```shell 
$ ls -l .git/refs/heads/
total 4
-rw-r--r-- 1 aalba 197121 41 Jan 01 00:00 main
-rw-r--r-- 1 aalba 197121 41 Jan 01 00:00 master
-rw-r--r-- 1 aalba 197121 41 Jan 01 00:00 primer-commit
-rw-r--r-- 1 aalba 197121 41 Jan 01 00:00 prueba
```

### Borrar la rama `prueba`

Para borrar la rama `prueba` utilizamos la opción `-d` del comando `git branch`:

```shell
> git branch -d prueba
Deleted branch prueba (was d5ee988).
```

Cuando borrarmos una rama por consola, `git` nos dice dónde estaba apuntando. Esto es útil
por si nos hemos equivocado, por ejemplo, y queremos volver crear la rama apuntando al mismo 
sitio al que estaba apuntando.

Podemos comprobar que la rama ya no está:

```shell
> git branch -v
* main          0206c90 Comando raiz usando cobra
  master        0206c90 Comando raiz usando cobra
  primer-commit d5ee988 Esqueleto del proyecto
```
