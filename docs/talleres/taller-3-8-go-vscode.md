---
layout: lab
title: "Taller 3.8: Resolución de conflictos con merge"
---

# Taller 3.8 (version Go con Visual Studio Code): Resolución de conflictos durante `git merge`

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descargas 
- Antes del taller: [go/github-client--taller-3-8-inicio.zip &#x1F4E5; ]({% link assets/zipfiles/talleres/go/github-client-taller-3-8-inicio.zip %})
- Ejercicio finalizado: [go/github-client-taller-3-8.zip &#x1F4E5; ]({% link assets/zipfiles/talleres/go/github-client-taller-3-8.zip %})

## Requisitos

{% include alert_box.html content='Debes descargar el fichero <code>github-client-taller-3-8-inicio.zip</code> e importar el proyecto en `Visual Studio Code` para poder realizar este taller'%}

Descarga e importa el proyecto [`go/github-cient--taller-3-8-inicio.zip`]({% link assets/zipfiles/talleres/go/github-client-taller-3-8-inicio.zip %})  en 
`Visual Studio Code`. A diferencia de los talleres anteriores, que empezaban donde terminaba un taller 
anterior, en este taller partimos de un repositorio que ya contiene las ramas y el código 
con el que vamos a trabajar.


## Qué vamos a hacer

Queremos desplegar las ramas `GHC-13-crea-package-commands` y la rama `GHC-14-muestra-salida-con-colores` que se muestran a continuación:

![Punto de partida]({% link assets/img/talleres/go/taller-3-8-sourcetree-punto-de-partida.png %})

Al hacer las integraciones, tendremos conflictos que deberemos resolver. ¿Porqué tendremos conflictos? Si miras el código, verás que en la rama 
`GHC-14-muestra-salida-con-colores` modifica el código de los comandos `autStatusCmd` y `prListCmd`, mientras que en la 
rama `GHC-13-crea-package-commands` esos comandos se extraen la paquete `commands`.

## Objetivos

Aprender a resolver conflictos durante una integración de ramas usando el comando `git merge`.

## Convenios

Seguiremos los mismos convenios sobre ramas que utilizamos en el 
[taller 3.7]({% link docs/talleres/taller-3-7-java-eclipse.md %}). 

## Despliegues

Seguiremos el mismo procedimiento de despliegue que describimos en el 
[taller 3.7]({% link docs/talleres/taller-3-7-java-eclipse.md %}). 

## Utilizando `Sourcetree` 

### ¿Qué queremos hacer?

{% include talleres/taller-3-8-que-queremos-hacer-1.md %}

Abrimos `Sourcetree` y hacemos doble clic sobre ella:

![main rama activa]({% link assets/img/talleres/go/taller-3-8-sourcetree-main-rama-activa.png %})

{% include talleres/taller-3-8-que-queremos-hacer-1.md %}

### Integrando `GHC-13-crea-package-commands`

Empezamos por integrar la rama `GHC-13-crea-package-commands`. Siguiendo las mismos 
pasos que en talleres anteriores, hacemos clic sobre el botón *Merge* de `Sourcetree`
y seleccionamos la rama `GHC-13-crea-package-commands`:

![Merge GHC-13 paso 1]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-13-paso-1.png %})

Hacemos clic en el botón `Ok` para integrar. Se trata de un *fast-forward merge* por lo que la rama `main` pasará a apuntar 
a la misma confirmación a la que apunta `GHC-13-crea-package-commands`:

![Merge GHC-13 paso 2]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-13-paso-2.png %})

### Integrando la rama `GHC-14-muestra-salida-con-colores`

{% include talleres/taller-3-8-integrando-la-rama-ghc-14-1.md %}

Abrimos `Sourcetree`, y hacemos doble clic sobre `main` si no es la rama activa.

Por último, nos preguntamos *¿En qué rama está el código que quiero integrar?*. La respuesta 
a esta pregunta es `GHC-14-muestra-salida-con-colores`. Hacemos clic sobre el botón *Merge* 
y seleccionamos la rama `GHC-14-muestra-salida-con-colores`:


![Merge GHC-14 paso 1]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-1.png %})

Al darle al botón *Ok*, `Sourcetree` nos indicará que `git` no ha podido hacer 
la operación porque ha encontrado conflictos:

![Merge GHC-14 paso 2 conflictos]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-2-conflictos.png %})

Hacemos clic sobre *Close*. `Sourcetree` nos muestra que hemos tenido conflictos al hacer la integración:
- En el grafo, vemos que aparece el *merge commit* en gris y en la descripción se indica *Uncommitted changes*
- Los ficheros con conflictos se muestran tanto en el área de ensayo como en el área de trabajo con un icono de 
  peligro (⚠️)

![Merge GHC-14 paso 2 indicación de conflictos]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-2-indicacion-conflictos.png %})

### Resolviendo los conflictos

{% include talleres/taller-3-8-resolviendo-los-conflictos.md %}

#### Resolviendo primera sección de conflictos 

{% include talleres/taller-3-8-resolviendo-primera-seccion-de-conflictos-1.md %}

Para ello nos apoyaremos en `Sourcetree`
para ver el código que ha cambiado en la rama `GHC-14-muestra-salida-con-colores`. 

Si miras la confirmación de cambios `099ddf6`, verás que se han modificado tres partes del fichero:
- líneas 73-75 correspondientes al comando `authLoginCmd`
- líneas 102-108 correspondiente al comando `authStatusCmd`
- líneas 163-168 correspondientes al comando `prListCmd`

{% include talleres/taller-3-8-resolviendo-primera-seccion-de-conflictos-2.md %}

#### Resolviendo segunda sección de conflictos 

{% include talleres/taller-3-8-resolviendo-segunda-seccion-de-conflictos-1.md %}

#### Versión final de los ficheros

{% include talleres/taller-3-8-version-final-de-los-ficheros.md %}

### Marcar conflictos como resueltos

{% include talleres/taller-3-8-marcar-conflictos-como-resueltos-1.md %}

Si volvemos a `Sourcetree` veremos que han cambiado algunas cosas:

![Merge GHC-14 paso 3 indicación de conflictos]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-3-indicacion-conflictos.png %})

{% include talleres/taller-3-8-marcar-conflictos-como-resueltos-2.md %}

El siguiente paso es decirle a `git` que el fichero `main.go` ya está resuelto. Podemos hacerlo de dos maneras:
- Subiendo el fichero al área de ensayo (haciendo clic en el icono con el `+` al lado del fichero)
- Utilizar el menú contextual de `Sourcetree`. Sobre  le fichero `main.go`, hacemos clic con el botón derecho,
  seleccionamos el submenú *Resolve Conflicts* y dentro de este *Mark Resolved*:

![Merge GHC-14 paso 3 marcar resuelto]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-3-marcar-resuelto.png %})

Tras hacerlo, el fichero `main.go` *¡¡desaparece del listado de ficheros modificados!!*

![Merge GHC-14 paso 3 marcado como resuelto]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-3-marcado-como-resuelto.png %})

{% include talleres/taller-3-8-marcar-conflictos-como-resueltos-3.md %}

### Confirmamos los cambios

{% include talleres/taller-3-8-confirmamos-los-cambios-1.md %}

Antes de confirmar, debemos subir al área de ensayo las modificaciones de los ficheros en la carpeta `commands/`.
Hacemos clic sobre *Stage All* y después sobre el botón *Commit* del menú superior. En la parte 
inferior que al mensaje estándar que `git` utiliza para el *merge commit*, `git` ha 
añadido los ficheros en los que encontró conflictos:


![Merge GHC-14 paso 4 confirmar los cambios]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-4-commit.png %})

Continuando con el taller, `Sourcetree` nos da la opción de modificar el mensaje por defecto que se genera. 
En este caso lo mantendremos como está, y haremos clic sobre el botón *commit* para terminar
de confirmar los cambios:

![Merge GHC-14 paso 5 cambios confirmados]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-5-merge-terminado.png %})

{% include talleres/taller-3-8-confirmamos-los-cambios-2.md %}

Como en las integraciones anteriores, `git` hace la instantánea del código (que hemos
preparado nosotros resolviendo los conflictos), le añade los datos, guarda
los objetos de `git` en la carpeta `.git/objects` y mueve la rama activa (`main`).


## Utilizando la consola

### ¿Qué queremos hacer?

{% include talleres/taller-3-8-que-queremos-hacer-1.md %}


Abrimos la consola y usamos el comando `git switch` para hacer `main` la rama activa:

```powershell
> git switch main
Switched to branch 'main'
```

{% include talleres/taller-3-8-que-queremos-hacer-2.md %}


### Integrando `GHC-13-crea-package-commands`

Empezamos por integrar la rama `GHC-13-crea-package-commands`. Siguiendo las mismos 
pasos que en talleres anteriores, utilizamos el comando `git merge` para integrar el códido en `main`:

```powershell
$ git merge GHC-13-crea-package-commands 
Updating df0e854..82d8706
Fast-forward
 commands/auth.go                | 104 ++++++++++++++++++++++++
 client.go => commands/client.go |  75 ++++++++++-------
 commands/init.go                |  26 ++++++
 commands/pr.go                  |  68 ++++++++++++++++
 main.go                         | 174 +---------------------------------------
 types.go                        |  16 ----
 6 files changed, 245 insertions(+), 218 deletions(-)
 create mode 100644 commands/auth.go
 rename client.go => commands/client.go (90%)
 create mode 100644 commands/init.go
 create mode 100644 commands/pr.go
 delete mode 100644 types.go
```

Se trata de un `fast-forward merge`, como el propio comando `git merge` nos indica en su salida, por lo que
la rama `main` pasará a apuntar a la misma confirmación a la que apunta `GHC-13-crea-package-commands`.
Podemos verlo usando el comando `git branch`:

```powershell
> git branch -v
  GHC-10-comando-pr-list              9200582 feat: pr list lee token the GHC_TOKEN si está definida
  GHC-11-token-en-variable-de-entorno c494502 feat: comando auth status utiliza GHC_TOKEN para leer el token
  GHC-12-refactoring                  df0e854 refactor: encapsular lógica GitHub en cliente
  GHC-13-crea-package-commands        82d8706 refactor: extraer comandos y cliente a paquete modular commands/
  GHC-14-muestra-salida-con-colores   099ddf6 feat: utiliza colores salida de comandos
  comando-auth                        9611db0 feat: implementa el comando auth status
* main                                82d8706 refactor: extraer comandos y cliente a paquete modular commands/
  master                              0206c90 Comando raiz usando cobra
  primer-commit                       d5ee988 Esqueleto del proyecto
```

Tras integrar los cambios, verifiquemos el estado del repositorio:

```powershell
> git log --all --oneline --graph
* 099ddf6 (GHC-14-muestra-salida-con-colores) feat: utiliza colores salida de comandos
* bebc268 chore: agrega dependencia fatih/color para mostrar salida con colores
| * 82d8706 (HEAD -> main, GHC-13-crea-package-commands) refactor: extraer comandos y cliente a paquete modular commands/
|/
* df0e854 (GHC-12-refactoring) refactor: encapsular lógica GitHub en cliente
* 06d0362 refactor: usa GitHubClient para validar token
* e731669 refactor: extrae tipos a types.go
*   aa46ac1 Merge branch 'GHC-10-comando-pr-list'
|\
| * 9200582 (GHC-10-comando-pr-list) feat: pr list lee token the GHC_TOKEN si está definida
| * e29ba6b feat: comando pr list muestra autor y enlace
| * 9ba307b chore: Mejora en la gestión de errores en comando pr list
| * f2b1636 feat: Implementa comando pr list
* | c494502 (GHC-11-token-en-variable-de-entorno) feat: comando auth status utiliza GHC_TOKEN para leer el token
|/
* 9611db0 (comando-auth) feat: implementa el comando auth status
* 5344602 feat: Implementa el comando auth login
* 0206c90 (tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```

### Integrando la rama `GHC-14-muestra-salida-con-colores`

{% include talleres/taller-3-8-integrando-la-rama-ghc-14-1.md %}

En la consola, ejecutamos el commando `git status` o `git branch` para verificar que `main` es la rama activa. 
Si no lo es, utilizamos `git switch` para hacer `main` la rama activa.

Por último, nos preguntamos *¿En qué rama está el código que quiero integrar?*. La respuesta 
a esta pregunta es `GHC-14-muestra-salida-con-colores`. Utilizamos `git merge` para integrar 
la rama en `main`:

```powershell
$ DATE='2055-02-01T17:05:17' --->>> importante usar fecha posterior a esta si  se tiene que repetir la operación por el reflog
> git merge GHC-14-muestra-salida-con-colores 
Auto-merging main.go
CONFLICT (content): Merge conflict in main.go
Automatic merge failed; fix conflicts and then commit the result.
```

Tras ejecutar el comando, `git` nos indica que no ha podido mezclar el fichero `main.go`. Veamos la salida del comando 
`git status`:

```powershell
> git status
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Changes to be committed:
        modified:   go.mod
        modified:   go.sum

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   main.go
```

Vemos que nos aparecen dos secciones:
- `Changes to be committed`: contiene los ficheros que `git` ha podido mezclar y que ya están en el área de ensayo, listos
  para confirmarse
- `Unmerged paths`: contiene los ficheros que `git` no ha podido mezclar, en nuestro caso `main.go`. Junto a cada fichero,
  `git` nos muestra porqué no ha podido mezclar los cambios, en este caso es porque en ambas ramas se han modificado las 
  mismas secciones del fichero `main.go`

Veamos cómo podemos resolver estos conflictos.

### Resolviendo los conflictos

{% include talleres/taller-3-8-resolviendo-los-conflictos.md %}

#### Resolviendo primera sección de conflictos 

{% include talleres/taller-3-8-resolviendo-primera-seccion-de-conflictos-1.md %}

Para ello nos apoyaremos en los comandos `git log` y `git show`
para ver el código que ha cambiado en la rama `GHC-14-muestra-salida-con-colores`. 
Miremos la historia de nuestro repositorio:

```powershell
> git log --all --oneline --graph
* 099ddf6 (GHC-14-muestra-salida-con-colores) feat: utiliza colores salida de comandos
* bebc268 chore: agrega dependencia fatih/color para mostrar salida con colores
| * 82d8706 (HEAD -> main, GHC-13-crea-package-commands) refactor: extraer comandos y cliente a paquete modular commands/
|/
* df0e854 (GHC-12-refactoring) refactor: encapsular lógica GitHub en cliente
* 06d0362 refactor: usa GitHubClient para validar token
* e731669 refactor: extrae tipos a types.go
*   aa46ac1 Merge branch 'GHC-10-comando-pr-list'
|\
| * 9200582 (GHC-10-comando-pr-list) feat: pr list lee token the GHC_TOKEN si está definida
| * e29ba6b feat: comando pr list muestra autor y enlace
| * 9ba307b chore: Mejora en la gestión de errores en comando pr list
| * f2b1636 feat: Implementa comando pr list
* | c494502 (GHC-11-token-en-variable-de-entorno) feat: comando auth status utiliza GHC_TOKEN para leer el token
|/
* 9611db0 (comando-auth) feat: implementa el comando auth status
* 5344602 feat: Implementa el comando auth login
* 0206c90 (tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```

La confirmación `bebc268` añade la dependencia, mientras que la confirmación `099ddf6` es la que realmente implementa la funcionalidad.
Veamos qué contiene la confirmación `099ddf6` usando el comando `git show`:

![salida comando git show]({% link assets/img/talleres/go/taller-3-8-consola-salida-comando-git-show.png %})
Si miras la confirmación de cambios `099ddf6`, verás que se han modificado tres partes del fichero:
- línea 7 se incluye la dependencia `fathi/color`
- líneas 70-71 se modifica el comando `authLoginCmd`
- alrededor de la línea 100 se modifica el comando `authStatusCmd`
- alrededor de la línea 169 se modifica el comando `prListCmd`

También podemos apoyarnos en `Visual Studio Code` para ver qué cambió en la confirmación de cambios `0099ddf6`.

{% include talleres/taller-3-8-resolviendo-primera-seccion-de-conflictos-2.md %}

#### Resolviendo segunda sección de conflictos 

{% include talleres/taller-3-8-resolviendo-segunda-seccion-de-conflictos-1.md %}

#### Versión final de los ficheros

{% include talleres/taller-3-8-version-final-de-los-ficheros.md %}

### Marcar conflictos como resueltos

{% include talleres/taller-3-8-marcar-conflictos-como-resueltos-1.md %}

Si volvemos a consola y ejecutamos el comando `git status` veremos que han cambiado algunas cosas:

```powershell
> git status
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Changes to be committed:
        modified:   go.mod
        modified:   go.sum

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   main.go

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   commands/auth.go
        modified:   commands/pr.go
```


{% include talleres/taller-3-8-marcar-conflictos-como-resueltos-2.md %}

El siguiente paso es decirle a `git` que el fichero `main.go` ya está resuelto. Para ello, utilizamos el 
comando `git add` para subir el fichero al área de ensayo:

```powershell
> git add main.go
```

Tras hacerlo, volvamos a usar el comando `git status` para ver el estado del repositorio:

```
> git status
On branch main
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
        modified:   go.mod
        modified:   go.sum

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   commands/auth.go
        modified:   commands/pr.go
```

Tras hacerlo, el fichero `main.go` *¡¡desaparece del listado de ficheros modificados!!*

{% include talleres/taller-3-8-marcar-conflictos-como-resueltos-3.md %}

### Confirmamos los cambios

{% include talleres/taller-3-8-confirmamos-los-cambios-1.md %}

Antes de confirmar, debemos subir al área de ensayo las modificaciones de los ficheros en la carpeta `commands/`.
Usamos el comando `git add .` y a continuación el comando `git status` para ver el estado del repositorio:

```powershell
> git add .
> git status
On branch main
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
        modified:   commands/auth.go
        modified:   commands/pr.go
        modified:   go.mod
        modified:   go.sum
```

Ejecutamos el comando `git commit` para finalizar el proceso:

```powershell
> git commit
```

Al hacerlo, `git` abre un editor de texto mostrándonos un mesaje por defecto. Usando este editor podemos
cambiar el mensaje si lo deseamos. Este mensaje incluye los ficheros en los que `git` encontró conflictos:

![Merge GHC-14 mensaje merge commit]({% link assets/img/talleres/go/taller-3-8-merge-ghc-14-consola-mensaje-merge-commit.png %})

{% include talleres/taller-3-8-confirmamos-los-cambios-2.md %}

Mantenemos el mensaje por defecto sencillamente saliendo del editor. Si como en el caso de la captura de pantalla
se te ha abierto el editor `vi`, presiona `:wq` para guardar y salir. Tras hacerlo, vemos este mensaje en la consola:

```powershell
[main 9c868a0] Merge branch 'GHC-14-muestra-salida-con-colores'
 Date: Mon Feb 1 17:05:17 2055 +0100
```


Como en las integraciones anteriores, `git` hace la instantánea del código (que hemos
preparado nosotros resolviendo los conflictos), le añade los datos, guarda
los objetos de `git` en la carpeta `.git/objects` y mueve la rama activa (`main`).

Utilizando el comando `git log` podemos ver el *merge commit* y el grafo de nuestro repositorio tras la integración:

```powershell
$ git log --all --oneline --graph
*   9c868a0 (HEAD -> main) Merge branch 'GHC-14-muestra-salida-con-colores'
|\
| * 099ddf6 (GHC-14-muestra-salida-con-colores) feat: utiliza colores salida de comandos
| * bebc268 chore: agrega dependencia fatih/color para mostrar salida con colores
* | 82d8706 (GHC-13-crea-package-commands) refactor: extraer comandos y cliente a paquete modular commands/
|/
* df0e854 (GHC-12-refactoring) refactor: encapsular lógica GitHub en cliente
* 06d0362 refactor: usa GitHubClient para validar token
* e731669 refactor: extrae tipos a types.go
*   aa46ac1 Merge branch 'GHC-10-comando-pr-list'
|\
| * 9200582 (GHC-10-comando-pr-list) feat: pr list lee token the GHC_TOKEN si está definida
| * e29ba6b feat: comando pr list muestra autor y enlace
| * 9ba307b chore: Mejora en la gestión de errores en comando pr list
| * f2b1636 feat: Implementa comando pr list
* | c494502 (GHC-11-token-en-variable-de-entorno) feat: comando auth status utiliza GHC_TOKEN para leer el token
|/
* 9611db0 (comando-auth) feat: implementa el comando auth status
* 5344602 feat: Implementa el comando auth login
* 0206c90 (tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```
