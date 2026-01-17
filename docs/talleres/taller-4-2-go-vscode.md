---
layout: lab
title: "Taller 4.2: Borrando el grafo"
---

# Taller 4.2 (version Go con Visual Studio Code): Borrando el grafo

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descarga 
- [go/github-client-taller-4-2.zip &#x1F4E5; ]({% link assets/zipfiles/talleres/go/github-client-taller-4-2.zip %})

## Requisitos

Este taller es continuación del taller 
[Taller 4.1: Copia de seguridad]({% link docs/talleres/taller-4-1-go-vscode.md %}).

Es recomendable haber completado el 
[taller 4.1]({% link docs/talleres/taller-4-1-go-vscode.md %}) y tener la copia de seguridad de tu repositorio 
antes de comenzar este taller.

## Qué vamos a hacer 

Borrar todas las referencias excepto una.

## Objetivos
- Ver cómo a medida que borramos las ramas del repositorio, *dejamos de ver* parte del grafo.
- Entender que aunque no *veamos el grafo*, las confirmaciones de cambios y, en general todos los objetos de
  `git` siguen en la carpeta `.git/objects`

## Convenios

Seguiremos los mismos convenios sobre ramas que utilizamos en el 
[taller 3.7]({% link docs/talleres/taller-3-7-go-vscode.md %}). 


## Despliegues

No hay despliegues en este taller.

## Usando `Sourcetree`

{% include talleres/go/taller-4-2-intro.md %}

![Tras borrar main]({% link assets/img/talleres/go/taller-4-2-sourcetree-tras-borrar-main.png %})

{% include talleres/go/taller-4-2-borrar-ghc-13.md %}

![Tras borrar GHC-13]({% link assets/img/talleres/go/taller-4-2-sourcetree-tras-borrar-ghc-13.png %})


{% include talleres/go/taller-4-2-borrar-ghc-12.md %}

![Tras borrar GHC-12]({% link assets/img/talleres/go/taller-4-2-sourcetree-tras-borrar-ghc-12.png %})


Continuamos borrando todas las ramas excepto la rama `master`. Cuando hayamos teminado, este será el aspecto de nuestro
repositorio:

![Solo rama master]({% link assets/img/talleres/go/taller-4-2-sourcetree-solo-rama-master.png %})

Por último, borramos las etiquetas:

![Solo rama master sin etiquetas]({% link assets/img/talleres/go/taller-4-2-sourcetree-solo-rama-master-sin-etiquetas.png %})

{% include talleres/go/taller-4-2-git-objects-contiene-todo-1.md %}

![Carpeta .git/objects]({% link assets/img/talleres/go/taller-4-2-sourcetree-carpeta-git-objects.png %})

{% include talleres/go/taller-4-2-git-objects-contiene-todo-2.md %}

![objeto 090ddf6]({% link assets/img/talleres/go/taller-4-2-sourcetree-carpeta-git-objects-objeto-099ddf6.png %})

{% include talleres/go/taller-4-2-git-objects-contiene-todo-3.md %}

## Usando la consola

{% include talleres/go/taller-4-2-intro.md %}


```powershell
> git branch -D main
Deleted branch main (was 9c868a0).
```


```powershell
> git log --all --oneline --graph
* 099ddf6 (GHC-14-muestra-salida-con-colores) feat: utiliza colores salida de comandos
* bebc268 chore: agrega dependencia fatih/color para mostrar salida con colores
| * 82d8706 (GHC-13-crea-package-commands) refactor: extraer comandos y cliente a paquete modular commands/
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
* 0206c90 (HEAD -> master, tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
```

{% include talleres/go/taller-4-2-borrar-ghc-13.md %}

```powershell
> git branch -D GHC-13-crea-package-commands
Deleted branch GHC-13-crea-package-commands (was 82d8706).
```

```powershell
> git log --all --oneline --graph
* 099ddf6 (GHC-14-muestra-salida-con-colores) feat: utiliza colores salida de comandos
* bebc268 chore: agrega dependencia fatih/color para mostrar salida con colores
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
* 0206c90 (HEAD -> master, tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```

{% include talleres/go/taller-4-2-borrar-ghc-12.md %}

```powershell
> git branch -D GHC-12-refactoring
Deleted branch GHC-12-refactoring (was df0e854).
```

```powershell
> git log --all --oneline --graph
* 099ddf6 (GHC-14-muestra-salida-con-colores) feat: utiliza colores salida de comandos
* bebc268 chore: agrega dependencia fatih/color para mostrar salida con colores
* df0e854 refactor: encapsular lógica GitHub en cliente
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
* 0206c90 (HEAD -> master, tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```
```

```


Continuamos borrando todas las ramas excepto la rama `master`. Notar que hemos utilizado la opción `-D` para borrar las ramas
ya que estas no estaban integradas en la rama activa. La única rama que se puede borrar con la opción `-d` (no fuerza el borrado)
es la rama `primer-commit`. 


Cuando hayamos teminado, este será el aspecto de nuestro repositorio:

```powershell
$ git log --all --oneline --graph
* 0206c90 (HEAD -> master, tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 Esqueleto del proyecto
```

Por ultimo, borramos las etiquetas:

```shell
$ git tag -d v0.0 v0.0-anotada  v0.0-ligera
Deleted tag 'v0.0' (was 8d879f4)
Deleted tag 'v0.0-anotada' (was d3cbdb2)
Deleted tag 'v0.0-ligera' (was 0206c90)
```

Cuando hayamos terminado, este será el aspecto de nuestro repositorio:

```shell
$ git log --all --oneline --graph
* 0206c90 (HEAD -> master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 Esqueleto del proyecto
```

{% include talleres/go/taller-4-2-git-objects-contiene-todo-1.md %}

```shell
> ls .git/objects/
02/  20/  29/  32/  3f/  53/  5d/  65/  82/  92/  99/  9d/  a4/  b0/  ca/  d0/  d5/  df/  e7/  f2/  fa/    pack/
06/  21/  2b/  33/  42/  54/  5f/  75/  86/  94/  9b/  9f/  a6/  be/  cc/  d3/  d6/  e2/  ea/  f5/  fc/
09/  22/  2c/  3a/  43/  57/  63/  7e/  8d/  96/  9c/  a1/  aa/  c4/  cf/  d4/  dd/  e6/  ec/  f7/  info/

```

{% include talleres/go/taller-4-2-git-objects-contiene-todo-2.md %}

```powershell
$ git cat-file -p 099ddf66
tree 20a80683728f8c22d32a6c4119559e67495ba957
parent bebc2680a623984d683fccc415e2a64625ac4abe
author Alfonso Alba García <alfonso@alfonsoalba.com> 2685109317 +0100
committer Alfonso Alba García <alfonso@alfonsoalba.com> 2685109317 +0100

feat: utiliza colores salida de comandos

```

{% include talleres/go/taller-4-2-git-objects-contiene-todo-3.md %}
