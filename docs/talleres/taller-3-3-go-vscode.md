---
layout: lab
title: "Taller 3.3: qué es main"
---

# Taller 3.3 (version go on Visual Studio Code): ¿Qué es main?

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descarga 

Este taller no tiene fichero descargable ya que al final del mismo, el repositorio acabará en el mismo estado en 
el que empieza

## Requisitos

Este taller es continuación del taller 
[Taller 3.2: crear etiquetas y ramas]({% link docs/talleres/taller-3-2-go-vscode.md %}).

Es necesario haber completado el 
[taller 3.2]({% link docs/talleres/taller-3-2-go-vscode.md %}) para poder realizar 
este taller. Puedes importar el proyecto [`go/github-client-taller-3-2.zip`]({% link assets/zipfiles/talleres/go/github-client-taller-3-2.zip %})
en `Visual Studio Code` y partir de él para hacer este taller.

## Objetivos

Ver que `main` no es más que un nombre arbitrario para un puntero.

## Usando `SourceTree`

En el menú lateral izquierdo, hacer clic con el botón derecho sobre `main` y seleccionar la opción 
*Rename main...*:

![Renombrar main paso 1]({% link assets/img/talleres/go/renombrar-main-1.png %})

Seleccionamos en nuevo nombre de la rama. Podemos seleccionar un nombre tan arbitrario y absurdo como queramos,
por ejemplo `tortilla-de-patatas`:


![Renombrar main paso 2]({% link assets/img/talleres/go/renombrar-main-2.png %})

¡Listo! ya tenemos un repositorio con una rama principal que tiene un nombre absurdo:


![Renombrar main paso 3]({% link assets/img/talleres/go/renombrar-main-3.png %})

Si abrimos la carpeta `.git/refs/heads` veremos que el fichero de texto plano `main`
ya no está, y ahora tenemos otro llamado `tortilla-de-patatas`. Este fichero contiene
el *checksum* de la última confirmación de cambios:

![Renombrar main carpeta heads]({% link assets/img/talleres/go/renombrar-main-carpetas-heads.png %})

¿Qué ocurriría si ahora continuamos haciendo cambios en el repositorio? Git haría lo mismo
que ha estado haciendo hasta ahora:
- Crear una instantánea
- Añadir los datos (autor, correo electrónico, mensaje, fecha, *checksum* de la confirmación anterior)
- Calcular el *checksum*
- Guardar los objetos de `git` en la carpeta `.git/objects`
- **Mover la rama activa**, que en este caso sería `tortilla-de-patatas`

Podemos utilizar el siguiente script en bash, ejecutándolo a través la terminal `git bash` para confirmar cinco 
cambios aleatorios en el repositorio:

```bash
for I in `seq 5`; do message=$(curl https://whatthecommit.com/index.txt); echo "$message" >> wtc.txt; git add wtc.txt; git commit -m"$message"; done
```


![Renombrar main commits adicionales]({% link assets/img/talleres/go/renombrar-main-commits-adicionales.png %})

Antes de terminar el ejercicio, renombrar la rama de vuelta a `main`.

(Los mensajes para las confirmaciones se han obtenido de [whatthecommit.com](https://whatthecommit.com/))

## Usando la consola

Para renombrar una rama, usamos la opción `-m` del comando `git branch`:

```shell
> git branch -m main tortilla-de-patatas
```

Si listamos las ramas veremos el cambio:

```shell
> git branch -l
* tortilla-de-patatas
```

En la carpeta `.git/refs/heads` veremos que el fichero `main` ya no está y en su lugar
tenemos el fichero `tortilla-de-patatas`:

```shell 
> ls .git/refs/heads
tortilla-de-patatas
```

¿Qué ocurriría si ahora continuamos haciendo cambios en el repositorio? Git haría lo mismo
que ha estado haciendo hasta ahora:
- Crear una instantánea
- Añadir los datos (autor, correo electrónico, mensaje, fecha, *checksum* de la confirmación anterior)
- Calcular el *checksum*
- Guardar los objetos de `git` en la carpeta `.git/objects`
- **Mover la rama activa**, que en este caso sería `tortilla-de-patatas`

Podemos utilizar el siguiente script en bash, ejecutándolo a través la terminal `git bash` para confirmar cinco 
cambios aleatorios en el repositorio:

```bash
for I in `seq 5`; do message=$(curl https://whatthecommit.com/index.txt); echo "$message" >> wtc.txt; git add wtc.txt; git commit -m"$message"; done
```

Tras ejecutar este script, la historia del proyecto queda de la siguiente manera:

```shell
> git log --graph --oneline
* 456dbe7 (HEAD -> tortilla-de-patatas) the magic is real
* ddf9841 I know, I know, this is not how I’m supposed to do it, but I can't think of something better.
* 248ae7e add dirty scripts from the dark side of the universe
* 602391c 50/50
* f5bb867 Inside we both know what's been going on
* 0206c90 (tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 Esqueleto del proyecto
```

Antes de terminar, volvemos nombrar la rama `main`:

```shell
> git branch -m tortilla-de-patatas main
```

## Consideraciones finales

Como hemos visto en este taller, cuando cambiamos el nombre a `main`,
**`git` sigue como si nada hubiese pasado**. Ni `git` por línea de comandos 
ni `SourceTree` se quejan, no te avisan de que `main` va a desaparecer y con ella todo tu proyecto. 
¡No hacen nada! ...porque `main` no es más que el nombre de un puntero.

Somos nosotros los que le damos significado a ese nombre. Somos nosotros los que 
decidimos que `main` va a ser el último código que se subió a producción (si 
es que este es el convenio que decidimo adoptar).

Por último, ejecutaremos este comando por consola para descartar las confirmaciones de cambios
que hemos creado:

```powershell
> git reset --hard v0.0
```

Hablaremos extensamente sobre el comando `git reset` en la sección 5 del curso.
