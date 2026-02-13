---
layout: lab
title: "Taller 4.4: Borrando la historia del repositorio"
---

# Taller 4.4 (version go con Visual Studio Code): Borrando la historia del repositorio

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descarga 
Este taller no tiene descarga. Cuando lo finalicemos será necesario recuperar el repositorio de
la copia de seguridad que hicimos en el 
[Taller 4.1]({% link docs/talleres/taller-4-1-go-vscode.md %}).

## Requisitos

Este taller es continuación del taller 
[Taller 4.3: Borrando el grafo]({% link docs/talleres/taller-4-3-go-vscode.md %}).

Para evitar problemas de bloqueos de ficheros en Windows, cierra `Sourcetree` y `Visual Studio Code`. El plugin de `git` de
`Visual Studio Code` puede mantener abiertos algunos ficheros de la carpeta `.git` y algún comando podría fallar.

## Qué vamos a hacer 

Borrar todas las confirmaciones de cambios del repositorio de manera definitiva.


## Objetivos
- Utilizar el comando `git reflog expire` para borrar las referencias a las confirmaciones
  de cambios del `reflog`
- Utilizar el comando `git gc` para borrar las confirmaciones de cambios de la carpeta `.git/objects`


## Despliegues

No hay despliegues en este taller.

## Usando `Sourcetree`

Este taller lo realizaremos usando la consola ya que `Sourcetree` no dispone de la opción de visualizar el `reflog`
cuando se desarrolló este taller.

## Usando la consola

### Primera ejecución del comando `git gc`: empaquetado

En el [Taller 4.3: Borrando el grafo]({% link docs/talleres/taller-4-3-go-vscode.md %}), terminamos
creando una rama prueba que nos permitía *ver* de nuevo todo el grafo.

Lo que buscamos es quedarnos sólo con la rama `master` y borrar de forma definitiva todas
las confirmaciones de cambios que se hicieron después.

Recordemos que para que el recolector de basura pueda borrar los objetos de `git` se tienen
que dar dos condiciones:
- Que sean más antiguos al periodo de gracia de 14 días configurado por defecto
- Que no exista ninguna referencia que nos permita llegar a esos objetos

Si miramos el grafo:

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

al tener la rama `prueba`, el recolector de basura no borrará ninguno de esos objetos. Aunque 
no pueda borrar objetos, lo que si hará el recolector de basura es empaquetarlos,
así que vamos a hacerlo. Si miramos el contenido de la carpeta `.git/objects`:

```shell
> ls .git/objects
02/  20/  29/  32/  3f/  53/  5d/  65/  82/  92/  99/  9d/  a4/  b0/  ca/  d0/  d5/  df/  e7/  f2/  fa/    pack/
06/  21/  2b/  33/  42/  54/  5f/  75/  86/  94/  9b/  9f/  a6/  be/  cc/  d3/  d6/  e2/  ea/  f5/  fc/
09/  22/  2c/  3a/  43/  57/  63/  7e/  8d/  96/  9c/  a1/  aa/  c4/  cf/  d4/  dd/  e6/  ec/  f7/  info/
```
  
Vemos que los objetos de `git` siguen estando como hasta ahora. Ejecutamos el comando `git gc`:

```shell
> git gc
Enumerating objects: 71, done.
Counting objects: 100% (71/71), done.
Delta compression using up to 16 threads
Compressing objects: 100% (70/70), done.
Writing objects: 100% (71/71), done.
Total 71 (delta 37), reused 0 (delta 0), pack-reused 0 (from 0)
```

Si volvemos a mirar el contenido de la carpeta `.git/objects`:

```shell
> ls -sR .git/objects/
.git/objects/:
total 4
0 info/  4 pack/

.git/objects/info:
total 5
4 commit-graph  1 packs

.git/objects/pack:
total 21
 4 pack-7bbf0488986469c216ab2de9840f03c83ec72e30.idx
 1 pack-7bbf0488986469c216ab2de9840f03c83ec72e30.rev
16 pack-7bbf0488986469c216ab2de9840f03c83ec72e30.pack
```

Vemos que todos los objetos de `git` se han empaquedato en un `pack` indexado. Como tenemos
todavía la rama `prueba`, el recolector de basura no ha borrado ninguna de nuestras confirmaciones
de cambios. Si ejecutamos el comando `git log` de nuevo, seguiremos viendo la historia completa
del repositorio.

### Borrando la rama `prueba`

Vamos a borrar la rama `prueba`. Para ello hacemos primero `master` la rama activa si no
lo es ya (recuerda que no se puede borrar la activa)

```shell
> git switch master
> git branch -D prueba
Deleted branch prueba (was 9c868a0).
```

Si mostramos de nuevo el grafo:

```shell
> git log --all --oneline --graph
* 0206c90 (HEAD -> master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 Esqueleto del proyecto 
```

Dejamos de ver todas las confirmaciones de cambios que se hicieron después de
`90336b5`. Como vimos en las diapositivas y talleres anteriores, no vemos esa
parte de la historia porque no tenemos ninguna rama o etiqueta que nos permita
llegar a esas confirmaciones de cambios. Pero están en nuestra carpeta
`.git/objects`, concretamente en los `packs` que el comando `git gc` ha creado
en su última ejecución (ver más arriba).

### Segunda ejecución del comando `git gc`

Si volvemos a ejecutar el comando `git gc`:

```shell
> git gc
Enumerating objects: 71, done.
Counting objects: 100% (71/71), done.
Delta compression using up to 16 threads
Compressing objects: 100% (33/33), done.
Writing objects: 100% (71/71), done.
Total 71 (delta 37), reused 71 (delta 37), pack-reused 0 (from 0)
```

¿Habrá borrado `git` esos *commits* que no podemos ver? La respuesta es que no,
porque en el `reflog` todavía podemos tener referencias a esos *commits* y,
además, los últimos cambios que has confirmado son más recientes que el período
de gracia de 14 días (Nota: esta parte del taller tiene una fuerte dependencia
de la fecha. Si estás usando el zip del taller 4.3, o alguno de los `.zip` anteriores como punto de partida, y
estás siguiendo este taller meses después de que lo crease, el resultado
de los comandos `git gc` y `git reflog expire` serán diferentes a lo que
expongo aquí. Estoy asumiendo que estás haciendo los talleres uno detrás de
otro como hacemos durante el curso)

¿Cómo podemos saber si el recolector de basura ha borrado esos *commits*?
¿Es necesario mirar dentro de los `packs`? No, podemos usar el comando
`git cat-file` para preguntarle a `git`:

```shell
> git cat-file -e 9c868a0^{commit}
> echo $?
0
```

Este comando devuelve `0` si se enuentra el objeto de git de tipo *commit* `9c868a0`. Si no lo encuentra,
como veremos luego, devuelve algo distinto de cero y muestra  un mensaje por la salida de error (`stderr`).
En este caso, nuestros cambios siguen en la carpeta `.git/objects` porque
el recolector de basura no lo puede borrar.

Otra opción, si no te gusta este comando de bajo nivel,
es crear una rama o una etiqueta en la confirmación de cambios `9c868a0`. Si no existe, el comando dará un error. 
**Si utilizas este método, acuerdate de borrar la rama o la etiqueta que crees, en caso contrario la siguiente sección
del taller no te funcionará.**

### Tercera ejecución del comando `git gc`: borrando *commits*

Si has seguido el curso hasta este punto, las confirmaciones de cambios de tu repostorio no superan los 90 días 
que el comando `git reflog expire` da para borrar las entradas del `reflog`. En lugar de esperar esos 90 días,
vamos a cambiar la configuración. Para ello ejecutamos los siguientes dos comandos:

```shell
> git config --local gc.reflogExpire now
> git config --local gc.reflogExpireUnreachable now
```
Estos dos comandos hacen lo siguiente:
- la opción `--local` hace que esta configuración se aplique sólo a este repositorio. **Asegurate de que no se te olvida
  para que no afecte al resto de repositorios que puedas tener en tu ordenador**
- `gc.reflogExpire now` hace que se puedan borrar las entradas más antiguas de este momento (es decir, todas las entradas)
- `gc.reflogExpireUnreachable` hace que se puedan borrar las entradas a las que no se puede llegar desde la rama activa
  y que sean más antiguas de este momento

Antes de volver a ejecutar `git gc`, veamos cómo es el `reflog` de la `HEAD`:

```shell
> git reflog --no-decorate
0206c90 HEAD@{0}: checkout: moving from master to master
9c868a0 HEAD@{1}: commit (merge): Merge branch 'GHC-14-muestra-salida-con-colores'
82d8706 HEAD@{2}: merge GHC-13-crea-package-commands: Fast-forward
df0e854 HEAD@{3}: reset: moving to GHC-12-refactoring
82d8706 HEAD@{4}: merge GHC-13-crea-package-commands: Fast-forward
099ddf6 HEAD@{5}: commit: feat: utiliza colores salida de comandos
bebc268 HEAD@{6}: commit (amend): chore: agrega dependencia fatih/color para mostrar salida con colores
ca8e743 HEAD@{7}: commit (amend): feat: utiliza colores salida de comandos
29e4c4d HEAD@{8}: commit (amend): chore: agrega dependencia fatih/color para mostrar salida con colores
fc92ed5 HEAD@{9}: commit: chore: agregar dependencia fatih/color para mostrar salida con colores
82d8706 HEAD@{10}: commit: refactor: extraer comandos y cliente a paquete modular commands/
df0e854 HEAD@{11}: commit: refactor: encapsular lógica GitHub en cliente
06d0362 HEAD@{12}: commit: refactor: usa GitHubClient para validar token
e731669 HEAD@{13}: commit: refactor: extrae tipos a types.go
aa46ac1 HEAD@{14}: merge GHC-10-comando-pr-list: Merge made by the 'ort' strategy.
9200582 HEAD@{15}: commit: feat: pr list lee token the GHC_TOKEN si está definida
e29ba6b HEAD@{16}: commit: feat: comando pr list muestra autor y enlace
9611db0 HEAD@{17}: merge comando-auth: Fast-forward
0206c90 HEAD@{18}: reset: moving to v0.0
9611db0 HEAD@{19}: commit: feat: implementa el comando auth status
5344602 HEAD@{20}: commit: feat: Implementa el comando auth login
0206c90 HEAD@{21}: commit: Comando raiz usando cobra
20d1eb2 HEAD@{22}: commit: Añadir dependencias: cobra
d5ee988 HEAD@{23}: commit (initial): Esqueleto del proyecto
```

Pasemos el recolector de basura:

```shell
> git gc
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 16 threads
Compressing objects: 100% (11/11), done.
Writing objects: 100% (12/12), done.
Total 12 (delta 1), reused 7 (delta 0), pack-reused 0 (from 0)
Enumerating cruft objects: 59, done.
Traversing cruft objects: 63, done.
Counting objects: 100% (59/59), done.
Delta compression using up to 16 threads
Compressing objects: 100% (27/27), done.
Writing objects: 100% (59/59), done.
Total 59 (delta 32), reused 59 (delta 32), pack-reused 0 (from 0)
```


¿Seguirá existiendo la confirmación de cambios `e1d48d9`? Vamos a comprobarlo:

```shell
> git cat-file -e 9c868a0^{commit}
> echo $?
0
```

Si, todavía existe. ¿Qué ha pasado con el `reflog` de `HEAD`? 


```shell
> git reflog --no-decorate
```

¡Está vacío! Es decir, `git gc` ha expirado el reflog pero no ha borrado los *commits*. ¿El motivo? que el comando
`git gc` nos da 14 días de gracia antes de borrar esos *commits*. Nos podemos saltar ese período de gracia con la opción `--prune`:

```shell
> git gc --prune=now
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 16 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (12/12), done.
Total 12 (delta 1), reused 12 (delta 1), pack-reused 0 (from 0)
```

y ahora podemos comprobar que el `commit` ya no está:

```shell
> git cat-file -e 9c868a0^{commit}
fatal: Not a valid object name 9c868a0^{commit}
```

Ahora sí, hemos borrado de manera definitiva la historia de nuestro repositorio. 
Por suerte, hicimos una copia de seguridad.

### Restaurar copia de seguridad

Esto podemos hacerlo fácilmente desde el explorador de archivos de Windows:

- Borramos todos los ficheros de la carpeta del proyecto
- Abrimos el fichero `.zip` con la copia de segurdad
- Arrastramos los ficheros desde el `.zip` a la carpeta del proyecto

![Restaurar copia de seguridad]({% link assets/img/talleres/go/taller-4-4-restaurar-copia-seguridad.png %})

Con esto, recuperamos nuestro repositorio:

```shell
> git log --all --oneline --graph
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

