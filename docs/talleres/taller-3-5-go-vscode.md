---
layout: lab
title: "Taller 3.5: Cambiar rama activa"
---

# Taller 3.5 (version Go con Visual Studio Code): Cambiar rama activa

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descarga 

Este taller no tiene fichero descargable ya que al final del mismo, el repositorio acabará en el mismo estado en 
el que empieza

## Requisitos

Este taller es continuación del taller 
[Taller 3.4: crear etiquetas y ramas]({% link docs/talleres/taller-3-4-go-vscode.md %}).

Es necesario haber completado el 
[taller 3.4]({% link docs/talleres/taller-3-4-go-vscode.md %}) para poder realizar 
este taller. Puedes importar el proyecto [`java/GithubClient-taller-3-4.zip`]({% link assets/zipfiles/talleres/go/github-client-taller-3-4.zip %})  en 
`Visual Studio Code` y partir de él para hacer este taller.

## Objetivos

Entender en qué consiste la operación de cambiar la rama activa (`git switch`).

## Usando `Sourcetree`

La forma más sencilla de cambiar la rama activa en `Sourcetree` el hacer doble clic sobre la rama que 
queremos activar en el menú de la izquierda.

Vamos a hacer doble clic sobre `master` en la sección *Branches* del menú de la izquierda para hacer `master` la rama
activa:

![Cambiar rama activa a master]({% link assets/img/talleres/go/cambiar-rama-activa-a-master.png %})

{% include talleres/go/taller-3-5-despues-de-hacer-master-la-rama-activa.md %}

### Cambiar a una rama que cambia el área de trabajo

Hacemos doble clic sobre la rama `primer-commit` para hacerla la rama activa:

![Cambiar rama activa a primer-commit]({% link assets/img/talleres/go/cambiar-rama-activa-a-primer-commit.png %})

{% include talleres/go/taller-3-5-despues-de-hacer-primer-commit-la-rama-activa.md %}

### Volvemos a hacer `main` la rama activa 

Volvemos a hacer doble clic sobre `main` para hacerla la rama activa:

![Cambiar rama activa a main]({% link assets/img/talleres/go/cambiar-rama-activa-a-main.png %})

Si miramos nuestro código en `Visual Studio Code`, observaremos cómo recuperamos la última instantánea que creamos, y de nuevo vemos nuestro `rootCmd` en el área de trabajo:

![Código en area de trabajo tras cambiar rama activa a main]({% link assets/img/talleres/go/cambiar-rama-activa-a-main-codigo.png %})


## Usando la consola

El comando para cambiar la rama activa es `git switch`. Utilizando este comando hacemos `master` la rama activa:

```powershell
> git switch master
Switched to branch 'master'
```
```
```

Podemos comprobar cuál es la rama activa utilizando varios comandos:
- `git status`
- `git branch`
- `git branch --show-current`
- `git log --decorate`

```powershell
> git status
On branch master
nothing to commit, working tree clean
```

El comando `git branch`, si no recibe argumentos, muestra las ramas locales (es como si lo llamásemos como `git branch -l`):

```powershell
> git branch

  main
* master
  primer-commit
```

Si nuestra terminal soporta colores, verás que la rama activa (`master` en este momento) aparece 
destacada en color y con un `*` delante del nombre. 

Podemos utilizar la opción `-v` para ver a qué confirmación de cambios apunta cada una de las ramas:

```powershell
> git branch -v
  main          0206c90 Comando raiz usando cobra
* master        0206c90 Comando raiz usando cobra
  primer-commit d5ee988 Esqueleto del proyecto
```


El comando `git branch` nos brinda la opción `--show-current` para ver sólo la rama activa:

```powershell
> git branch --show-current
master
```

Esta opción es muy útil cuando estamos programando scripts.

Por último, el comando `git log` con la opción `--decorate` nos muestra cuál es la rama activa:

```powershell
$ git log --oneline --graph --all --decorate
* 0206c90 (HEAD -> master, tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, main) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```

si observas la primera línea que retorna el comando, verás cómo `git log` nos dice a qué rama está a apuntado `HEAD`: `HEAD -> master`. Si sólo buscamos saber cuál es la rama activa, `git log` posiblemente nos de demasiada información y no sea 
la manera más cómoda de verlo.

{% include alert_box.html content="La opción <code>--decorate</code> puede omitirse ya que en versiones modernas de git
                                   se utiliza la configuración <code>log.decorate=auto</code>. La opción <code>auto</code> 
                                   muestra esta información
                                   cuando el comando <code>git log</code> detecta que la salida va a una consola." %}

{% include talleres/go/taller-3-5-despues-de-hacer-master-la-rama-activa.md %}

Podemos ver dónde apunta `HEAD` utilizando el comando `cat`:

```powershell
> cat .git/HEAD
ref: refs/heads/master
```


### Cambiar a una rama que cambia el área de trabajo

Utilizando de nuevo el comando `git switch`, hacemos la rama `primer-commit` la rama activa:

```powershell
> git switch primer-commit
Switched to branch 'primer-commit'
```

Si miramos el contenido de `.git/HEAD`, veremos que ha cambiado y ahora apunta a `primer-commit`:

```powershell
> cat .git/HEAD
ref: refs/heads/primer-commit
```

Y si utilizamos cualquiera de las opciones que vimos en la sección anterior podemos ver que la rama activa es `primer-commit`:

```powershell
> git branch -v
  main          0206c90 Comando raiz usando cobra
  master        0206c90 Comando raiz usando cobra
* primer-commit d5ee988 Esqueleto del proyecto
```

{% include talleres/go/taller-3-5-despues-de-hacer-primer-commit-la-rama-activa.md %}

### Volvemos a hacer `main` la rama activa 

Utilizamos de nuevo el comando `git switch`:

```powershell
> git switch main
Switched to branch 'main'
```

Si miramos nuestro código en `Visual Studio Code`, observaremos cómo recuperamos la última instantánea que creamos, y de nuevo vemos nuestro `rootCmd` en el área de trabajo:

![Código en area de trabajo tras cambiar rama activa a main]({% link assets/img/talleres/go/cambiar-rama-activa-a-main-codigo.png %})


