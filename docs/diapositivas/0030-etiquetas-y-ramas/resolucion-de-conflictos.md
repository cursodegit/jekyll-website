## Resolución de conflictos

Notes:
En esta sección veremos cuádo se presentan conflictos al integrar ramas
y cómo resolverlos.

^^^^^^

#### ¿Cuándo ocurren los conflictos en git?

Cuando dos personas modifican la misma parte de un archivo 

- Modifican la misma línea o la inmediatamente anterior o posterior
- Crean el mismo fichero
- Una modifica un fichero que la otra ha borrado

Notes:
Sería más correcto decir que los conflictos ocurren cuando en dos confirmaciones 
diferentes, se modifica la misma parte de un archivo. 
Esas confirmaciones pueden, o no, haber sido 
realizadas por la misma persona.

^^^^^^

#### ¿Qué hace git cuando encuentra un conflicto?

Si git no puede mezclar los cambios automáticamente:

- Marca los archivos que no ha podido mezclar
- El *merge* de detiene

Somos nosotros los que debemos terminar de mezclar los cambios:

- Resolvemos los conflictos **mezclando las partes que git no pudo mezclar**
- Confirmamos los cambios (ejecutando `git commit`)

^^^^^^

#### Operaciones que pueden generar conflictos

- `git merge` 
- `git stash`
- `git cherry-pick` y `git rebase`
- `git revert`

Notes:
Cualquier operación de `git` que suponga la mezcla de cambios puede generar 
conflictos. Todos los comandos descritos en estas diapositivas mezclan cambios 
de una u otra forma y, por lo tanto, pueden generar conflictos.

El ejemplo más claro es `git merge` ya que en ese comando estamos mezclando 
dos instantáneas diferentes del repositorio, pero no es ni mucho menos el único.

También es habitual encontrar conflictos al hacer *rebases* (al fin y al cabo
un rebase no deja de ser una operación de integración de cambios como el *merge*).

Otra situación habitual en la que nos encontramos con conflictos es al guardar 
algo en el *stash* y luego recuperarlo en una rama diferente a aquella en la que 
se generó. 


^^^^^^

#### Taller 3.8: Resolución de conflictos durante `git merge`

[Ir al Taller 3.8](../../talleres/taller-3-8-java-eclipse.html)

^^^^^^
