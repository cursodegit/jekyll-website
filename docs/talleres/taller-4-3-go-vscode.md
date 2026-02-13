---
layout: lab
title: "Taller 4.3: Recuperando el grafo usando el reflog"
---

# Taller 4.3 (version Go con Visual Studio Code): Recuperando el grafo usando el `reflog`

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descarga 
- [go/github-client-taller-4-3.zip &#x1F4E5; ](({% link assets/zipfiles/talleres/go/github-client-taller-4-3.zip %})

## Requisitos

Este taller es continuación del taller 
[Taller 4.2: Borrando el grafo]({% link docs/talleres/taller-4-2-go-vscode.md %}).

## Qué vamos a hacer 

Recuperar todas las confirmaciones de cambios que hemos dejado de ver.

## Objetivos
- Utilizar el comando `git reflog` para ver las operaciones realizadas sobre `HEAD`
- Interpretar la líneas del `reflog`
- Volver a ver toda la historia de nuestro repositorio

## Despliegues

No hay despliegues en este taller.

## Usando `Sourcetree`

Este taller lo realizaremos usando la consola ya que `Sourcetree` no dispone de la opción de visualizar el `reflog`
cuando se desarrolló este taller.

## Usando la consola

### Tirando de memoria

Si miras la sección de objetivos un poco más arriba, verás que uno de ellos es volver
a ver el grafo. Para poder ver de nuevo todas nuestras confirmaciones de cambios,
necesitamos crear una referencia (una rama o una etiqueta) que apunte a la última
confirmación de cambios que creamos. Vamos a buscar el nombre (*hash*) de esa
confirmación.

Si hacemos un poco de memoria, los últimos cambios que confirmamos fueron la integración de
las ramas `GHC-13` y `GHC-14` en la rama `main`, que generó un *merge commit*
(después de resolver los conflictos que surgieron).

Miremos qué nos devuelve el comand `git relog`:

```shell
> git reflog
0206c90 (HEAD -> master) HEAD@{0}: checkout: moving from main to master
9c868a0 HEAD@{1}: commit (merge): Merge branch 'GHC-14-muestra-salida-con-colores'
82d8706 HEAD@{2}: reset: moving to HEAD
82d8706 HEAD@{3}: merge GHC-13-crea-package-commands: Fast-forward
df0e854 HEAD@{4}: reset: moving to GHC-12-refactoring
82d8706 HEAD@{5}: merge GHC-13-crea-package-commands: Fast-forward
df0e854 HEAD@{6}: checkout: moving from GHC-10-comando-pr-list to main
9200582 HEAD@{7}: checkout: moving from main to GHC-10-comando-pr-list
df0e854 HEAD@{8}: checkout: moving from main to main
df0e854 HEAD@{9}: checkout: moving from GHC-14-muestra-salida-con-colores to main
099ddf6 HEAD@{10}: reset: moving to HEAD
099ddf6 HEAD@{11}: commit: feat: utiliza colores salida de comandos
bebc268 HEAD@{12}: commit (amend): chore: agrega dependencia fatih/color para mostrar salida con colores
ca8e743 HEAD@{13}: commit (amend): feat: utiliza colores salida de comandos
29e4c4d HEAD@{14}: commit (amend): chore: agrega dependencia fatih/color para mostrar salida con colores
fc92ed5 HEAD@{15}: commit: chore: agregar dependencia fatih/color para mostrar salida con colores
df0e854 HEAD@{16}: checkout: moving from main to GHC-14-muestra-salida-con-colores
df0e854 HEAD@{17}: merge GHC-12-refactoring: Fast-forward
aa46ac1 HEAD@{18}: checkout: moving from GHC-12-refactoring to main
df0e854 HEAD@{19}: reset: moving to HEAD^
82d8706 HEAD@{20}: commit: refactor: extraer comandos y cliente a paquete modular commands/
df0e854 HEAD@{21}: commit: refactor: encapsular lógica GitHub en cliente
06d0362 HEAD@{22}: commit: refactor: usa GitHubClient para validar token
e731669 HEAD@{23}: commit: refactor: extrae tipos a types.go
aa46ac1 HEAD@{24}: checkout: moving from main to GHC-12-refactoring
aa46ac1 HEAD@{25}: checkout: moving from GHC-10-comando-pr-list to main
9200582 HEAD@{26}: checkout: moving from main to GHC-10-comando-pr-list
aa46ac1 HEAD@{27}: checkout: moving from main to main
aa46ac1 HEAD@{28}: merge GHC-10-comando-pr-list: Merge made by the 'ort' strategy.
c494502 HEAD@{29}: checkout: moving from GHC-10-comando-pr-list to main
9200582 HEAD@{30}: commit: feat: pr list lee token the GHC_TOKEN si está definida
e29ba6b HEAD@{31}: commit: feat: comando pr list muestra autor y enlace
9ba307b HEAD@{32}: checkout: moving from main to GHC-10-comando-pr-list
c494502 HEAD@{33}: merge GHC-11-token-en-variable-de-entorno: Fast-forward
9611db0 HEAD@{34}: checkout: moving from main to main
9611db0 HEAD@{35}: checkout: moving from GHC-11-token-en-variable-de-entorno to main
c494502 HEAD@{36}: checkout: moving from main to GHC-11-token-en-variable-de-entorno
9611db0 HEAD@{37}: checkout: moving from GHC-11-token-en-variable-de-entorno to main
c494502 HEAD@{38}: commit: feat: comando auth status utiliza GHC_TOKEN para leer el token
```

Recuerda que cuando ejecutes este comando sobre tu repositorio, sólo verás lo mismo
si has descargado y restaurado una copia del taller 4.2 en tu máquina. Si has
seguido los talleres haciendo tus propios *commits* el `reflog` será diferente.

Mirando las operaciones de `git`, puedo ver cómo integramos la rama `GHC-13` en la
rama `main` y luego integramos la rama `GHC-14`: 

```shell
> git reflog
0206c90 (HEAD -> master) HEAD@{0}: checkout: moving from main to master
9c868a0 HEAD@{1}: commit (merge): Merge branch 'GHC-14-muestra-salida-con-colores'
82d8706 HEAD@{2}: ...
82d8706 HEAD@{3}: ...
df0e854 HEAD@{4}: ...
82d8706 HEAD@{5}: merge GHC-13-crea-package-commands: Fast-forward
df0e854 HEAD@{6}: checkout: moving from GHC-10-comando-pr-list to main
```

He limpiado el `reflog` y he dejado únicamente las operaciones de `git` relacionadas
con la integración de las ramas `GHC-13` y `GHC-14`. La línea `HEAD{1}` es la que
contiene la integración (`merge`) de la rama `GHC-14`, la que nos dió conflictos
al integrar y que resolvimos en el taller 3.8. Después de hacer esa operación,
la rama activa quedó apuntando a la confirmación `9c868a0`, ¡ese es el 
*hash* de la confirmación de cambios que estamos buscando!.

### Recuperando el grafo

Veamos cómo está el grafo en este momento:

```shell
$ git log --all --oneline --graph
* 0206c90 (HEAD -> master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 Esqueleto del proyecto
```


Sólo vemos los tres primeros *commits*. Vamos a crear una rama `prueba`
que apunte al *commit* `9c868a0`, que es el que hemos identificado como *último commit* usando el
`reflog`:

```shell
> git branch prueba 9c868a0
```

Creada la rama, veamos cómo se ve el grafo:

```shell
> git log --all --oneline --graph
*   9c868a0 (prueba) Merge branch 'GHC-14-muestra-salida-con-colores'
|\
| * 099ddf6 feat: utiliza colores salida de comandos
| * bebc268 chore: agrega dependencia fatih/color para mostrar salida con colores
* | 82d8706 refactor: extraer comandos y cliente a paquete modular commands/
|/
* df0e854 refactor: encapsular lógica GitHub en cliente
* 06d0362 refactor: usa GitHubClient para validar token
* e731669 refactor: extrae tipos a types.go
*   aa46ac1 Merge branch 'GHC-10-comando-pr-list'
|\
| * 9200582 feat: pr list lee token the GHC_TOKEN si está definida
| * e29ba6b feat: comando pr list muestra autor y enlace
| * 9ba307b chore: Mejora en la gestión de errores en comando pr list
| * f2b1636 feat: Implementa comando pr list
* | c494502 feat: comando auth status utiliza GHC_TOKEN para leer el token
|/
* 9611db0 feat: implementa el comando auth status
* 5344602 feat: Implementa el comando auth login
* 0206c90 (HEAD -> master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 Esqueleto del proyecto 
```

¡Ya volvemos a ver todo el repositorio! Si vuelves a `Sourcetree` y recargas,
verás que volvemos a ver todas las confirmaciones de cambios que hemos hecho:

![Grafo completo visible]({% link assets/img/talleres/go/taller-4-3-sourcetree-grafo-visible.png %})


### Filtrando el `reflog`

En esta sección vamos a filtrar la salida del comando `git reflog`. Este comando
tiene varios subcomandos:
- `show`
- `list`
- `expire`
- `delete`
- `exists`

Si se llama sin subcomando, como lo estamos llamando hasta ahora, se utiliza
el subcomando por defecto, que es `git reflog show`. Así que cada vez que veas
ejecutar `git reflog`, en realidad estamos ejecutando `git reflog show`.
Puedes ver más información sobre esto en la [página de manual](https://git-scm.com/docs/git-reflog).

Como se indica en la página de manual, el comando `git reflog show`, acepta las
mismas opciones que el comando  `git log` para el filtrado. Puedes ver
todas esas opciones en la [página de manual de git-log](https://git-scm.com/docs/git-log#_options).
Hay unas cuantas, y el objetivo del taller no es verlas todas así que sólo
utilizaré aquellas que necesite para conseguir el objetivo que esté buscando.

Si sabemos que la confirmación de cambios que estamos buscando es el resultado de ejecutar el comando
`git merge`, podemosfiltrar el reflog para que nos muestre sólo
aquellas entradas que contienen la palabra *merge* usando la opción `--grep-reflog`:

```shell
> git reflog --no-decorate --grep-reflog='merge'
9c868a0 HEAD@{1}: commit (merge): Merge branch 'GHC-14-muestra-salida-con-colores'
82d8706 HEAD@{3}: merge GHC-13-crea-package-commands: Fast-forward
82d8706 HEAD@{5}: merge GHC-13-crea-package-commands: Fast-forward
df0e854 HEAD@{17}: merge GHC-12-refactoring: Fast-forward
aa46ac1 HEAD@{28}: merge GHC-10-comando-pr-list: Merge made by the 'ort' strategy.
c494502 HEAD@{33}: merge GHC-11-token-en-variable-de-entorno: Fast-forward
9611db0 HEAD@{46}: merge comando-auth: Fast-forward
9611db0 HEAD@{50}: merge comando-auth: Fast-forward
```

Las primeras líneas muestran la misma operación dos veces: 
`Merge branch 'GHC-13-crea-package-commands'`. ¿Cómo es posible? Recuerda que estás
viendo mi repositorio, y lo he preparado para que esto ocurra. Si has hecho los
talleres y tienes tus propias confirmaciones de cambios, en este punto no verás esta
entrada dos veces en tu `reflog`.

También podemos filtrar mirando sólo ls últimas operaciones. Por ejemplo, quiero limitar
la salida a lo que ha pasado entre `HEAD{6}` y `HEAD{0}`:

```shell
$ git reflog --no-decorate -n 7
0206c90 HEAD@{0}: checkout: moving from main to master
9c868a0 HEAD@{1}: commit (merge): Merge branch 'GHC-14-muestra-salida-con-colores'
82d8706 HEAD@{2}: reset: moving to HEAD
82d8706 HEAD@{3}: merge GHC-13-crea-package-commands: Fast-forward
df0e854 HEAD@{4}: reset: moving to GHC-12-refactoring
82d8706 HEAD@{5}: merge GHC-13-crea-package-commands: Fast-forward
df0e854 HEAD@{6}: checkout: moving from GHC-10-comando-pr-list to main
```

En este caso hemos usado la opción `-n 7` que nos muestra solo 7 resultados.
Lo que ha pasado es lo siguiente:
- se hizo `main` la rama activa (`HEAD@{6}`)
- se integró la rama `GHC-13-crea-package-commands` mediante un *fast-forward merge* (`HEAD@{5}`)
- se ejecutó el comando `reset` (`HEAD@{4}`) operación que veremos en el siguiente capítulo del curso. 
  Aunque no conozcas la operación todavía, te adelanto que lo que se hizo fue mover la rama activa
  (`main`) a la misma confirmación a la que apuntaba la rama `GHC-12-refactoring`. Esta operación
  es, básicamente, deshacer el *fast-forward merge* del paso anterior
- se volvió a integrar la rama `GHC-13-crea-package-commands`, mediante un *fast-forward merge* (`HEAD@{3}`)
- se hizo otro `reset`. En este caso, si miras la línea `HEAD@{2}` ves que después de hacer el reset, 
  la rama activa (que sigue siendo `main`) sigue apuntando a la misma confirmación de cambios (`82d8706`).
  Es como que se hizo un `reset` de la rama a la misma confirmación a la que apuntaba
- finalmente, se integra la rama `GHC-14-muestra-salida-con-colores` (`HEAD@{1}`) y `HEAD` apunta a `9c869a0`,
  que es el *hash* de la confirmación de cambios que estábamos buscando

Este es un caso un poco más realista de lo que nos podemos encontrar en *la vida real*. Lo que  busco ilustrar
es que el `reflog` no es un fichero sencillo de descifrar, y que entender lo que ha pasado puede resultar
una tarea tediosa y complicada, especialmente si estás buscando *commits* antiguos y no te acuerdas 
de lo que pasó cuando los creaste.

### ¿Qué pasa con el resto de las ramas y etiquetas?

Hemos conseguido volver a ver la historia de nuestro repositorio creando una rama `prueba` pero
¿qué pasa con el resto de ramas y etiquetas?

En el `reflog` de `HEAD` no queda constancia de estas operaciones, por lo que no tenemos
forma de recuperar esta información. Por suerte, hicimos una copia de seguridad
de nuestro repositorio y cuando la restauremos en el Taller 4.4 recuperaremos esta
información.
