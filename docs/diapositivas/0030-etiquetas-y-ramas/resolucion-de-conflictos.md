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
- Marca las secciones de los ficheros que no ha podido mezclar
- El *merge* de detiene

Somos nosotros los que debemos terminar de mezclar los cambios:

- Resolvemos los conflictos **mezclando las partes que git no pudo mezclar**
- Confirmamos los cambios (ejecutando `git commit`)

^^^^^^
#### ¿Cómo indica git los conflictos?
- `git status`

```
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Changes to be committed:
        new file:   src/com/alfonsoalba/Colors.java

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   src/com/alfonsoalba/MainClass.java
```

Notes:

Al ejecutar el comando `git status` git muestra en la sección *Changes to be committed* 
los ficheros que pudo mezclar.

En la sección *Unmerged paths* muestra los ficheros en los que encontró conflictos
y el tipo de conflicto, es decir, el motivo por el que no pudo mezclar el código.

^^^^^^
#### ¿Cómo indica git los conflictos?
- Dentro los ficheros:

```
<<<<<<< HEAD
Código de la rama activa
=======
Código de la rama que estamos integrando en la rama activa
>>>>>>> nombre_de_la_rama
```
- ¡Sólo marca las zonas que no pudo mezclar!

Notes:

Dentro de los ficheros, `git` marca con separadores aquellas zonas del fichero que no 
pudo mezclar. 

Las zonas del fichero que sí pudo mezclar, se mezclan sin más.

^^^^^^

#### ¿Cómo resolvemos el conflicto?

- Abrimos un fichero con conflictos
- Mezclamos manualmente todas las zonas del fichero que `git` no pudo mezclar
- Marcamos el fichero como resuelto ejecutando `git add`
- Repetimos para todos los ficheros
- Confirmamos los cambios con `git commit`

Notes:

El proceso de resolución de conflictos consiste en resolverlos manualmente, uno a uno.

Vamos fichero a fichero mezclando el código que `git` no pudo mezclar. Cuando hemos 
terminado de resolver los conflictos en un fichero, lo guardamos y lo marcamos como resuelto
añadiéndolo al área de ensayo: 

```shell
$ git add src/com/alfonsoalba/MainClass.java
```

Repetimos esta operación con todos y cada uno de los ficheros con conflictos hasta que todos 
ellos estén en el área de ensayo:

```shell
$ git status
On branch master

Changes to be committed:
        new file:   src/com/alfonsoalba/Colors.java
        modified:   src/com/alfonsoalba/MainClass.java

```

Confirmamos los cambios ejecutando `git commit`.

^^^^^^

#### ¿Cómo resolvemos el conflicto?

Mensaje por defecto que se muestra al ejecutar `git commit`:

```text
blablabla
```
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

#### Algunos *consejos* basados en mi experiencia

La resolución de conflictos es el punto más débil del flujo de trabajo


- Prestar atención y no confiarse
- No hacerlo solos si no estamos familiarizados con el código
- Tests (ayudan pero no son infalibles)
- Evitarlos si se puede
- Evitar ramas de larga duración

Notes:

La resolución de conflictos es el punto más débil del flujo de trabajo con 
`git`. Es el momento en el que podemos borrar código que no deberíamos, u olvidarnos o no
darnos cuenta de que tenemos que mover código de un fichero a otro como nos 
ha pasado en el taller. Si trabajamos en equipo, el conflicto puede ocurrir con 
código con el que no estamos familiarzados lo que hace más fácil que no nos 
percatemos del error que estamos cometiendo.

A lo largo de los años lo siguiente me ha ayudado a mitigar este riesgo:
- Prestar atención: ya sé que esto puede parecer evidente, pero confiarse y resolver 
  un conflicto rápido porque parece fácil y no quieres perder mucho tiempo es la combinación
  perfecta para equivocarse. Pararse y hacerlo con atención es una receta que me ha funcionado
  (casi) siempre
- Tener una buena batería de tests: he visto en muchas ocasiones como un conflicto 
  mal resuelto se caza en un sistema de integración contínua gracias a los tests, así 
  que yo soy un firme defensor del *testing* automatizado. En cualquier caso, los tests 
  no son infalibles así que tenerlos no implica que no debamos prestar atención
- No resolverlos solo: si no estás familiarizado con el código involucrado, hacer una
  sesión de *pair programming* con la persona del equipo que hizo los otros cambios 
  siempre ayuda a mitigar este riesgo. No sólo porque esa persona escribió el código, 
  cuatro ojos ven más que dos especialmente si los conflictos son complicados de resolver.
- Evitarlos: organizar el trabajo del equipo de determinada manera evita directamente que 
  los conflictos ocurran. Muchas veces he visto que una correcta comunicación ya sea
  entre miembros de un mismo equipo o entre equipos ayuda mucho a detectar que 
  se pueden producir conflictos y permite coordinar el trabajo bien para evitarlos 
  completamente, o al menos para reducir su complejidad sustancialmente.
- Evitar ramas de larga duración: las ramas de larga duración, si no se gestionan bien, 
  pueden acabar generando conflictos enormes que luego son muy difíciles de resolver,
  y cuánto más difícil de resolver es un conflicto, mayor el riesgo de introducir errores.
  Si vamos a trabajar en una rama de larga duración, yo hago lo siguiente:
  - Utilizar un feature flag para poder integrar el código en `main` a menudo y desplegarlo
    en producción 
  - Integrar `main` con frecuencia en la rama de larga duración para evitar encontrarme
    con un conflicto enorme al final. Es mejor en mi experiencia ir resolviendo esos 
    conflictos poco a poco.

Recuerdo un equipo en el que siendo manager sugerí no usar ramas de larga duración para una 
funcionalidad que nos iba a llevar un par de meses desarrollar. Mi propuesta era 
lo que he sugerido arriba: usar *feature flags* e integrar a menudo en nuestra rama principal.
El equipo respondió que luego había que limpiar el *feature flag* y que eso llevaría mucho 
tiempo, y que tener que estar desplegando cada ticket y validándolo con el equipo de 
calidad iba a llevar más tiempo. Mejor hacerlo todo, validarlo e integrarlo al final.
Acepté con una condición: que yo no iba a participar de la resolución de los conflictos. El equipo aceptó. Después de ese proyecto, no volvimos a tener esta discusión, las dos personas 
(una de Backend y otra de Frontend) que se pasaron casi una semana entera dedicados a
integrar la rama con la responsabilidad de no romper nada se encargaron en adelante
de evitar que nadie del equipo usase ramas de larga duración sin un *feature flag*.

^^^^^^
#### Algunos *consejos* basados en mi experiencia

No resolver bugs ni añadir código no relacionado con el conflicto cuando estos se resuelvan 

¡`git` puede reescribir la historia!

^^^^^^

`git` permite reescribir la historia del repostiorio. Hablaremos en detalle sobre este tema más adelante
cuando introduzcamos el comando `git rebase`. Cuando se reescribe la historia, 
`git` vuelve a recrear las confirmaciones de cambios que ya existen generando, generando nuevas.
Al hacer esta operación, los conflictos que aparecieron en la historia original, vuelven a recrearse y
deben resolverse de nuevo. 

Imaginemos la siguiente situación:
- En la historia original del repositorio se añade a un *merge commit* código que nada tiene que ver con el conflicto, 
  por ejemplo se resuelve un *bug* que nos hemos encontrado a la vez que resolvermos los conflictos
- Alguien en el futuro, no necesariamente nosotros mismos, reescribe la historia
- Al hacer esa operación, a esa persona le pueden saltar los mismos conflictos, o muy parecidos, que se resolvieron
  en la historia original
- Al resolverlos de nuevo, si esa persona no sabe de la existencia de ese *bug* lo más probable es que no lo resuelva

En el ejemplo que he puesto de encontrarnos un *bug* durante la resolución de conflictos, la manera de proceder sería:
- o bien abortar la integración, confirmar nuevos cambios con la resolución del bug y volver a integrar,
- o bien terminar de resolver los conflictos, resolver el *bug* y crear un nuevo *commit* con la resolución del problema

^^^^^^

#### Algunos *consejos* basados en mi experiencia

Cuando los conflictos ocurren muy a menudo, puede significar que algo no está bien:

- ¿Arquitectura de la aplicación?
- ¿Falta de comunicación?

o que la tecnología que utilizas no facilita modularizar el código

^^^^^^

Quizás la arquitectura de la aplicación hace que habitualmente varias personas tengan que modificar
el mismo código de manera simultánea. Recuerdo el caso de un equipo en un curso que trabajaban con 
una aplicación *legacy* que tenía un super-controlador en el que se producían muchos conflictos.
Eran conscientes del problema y estaban ya trabajando en la solución cuando dimos el curso: refactorizar
ese controlador y distribuir responsabilidades extrayéndola a otros controladores.

También puede ocurrir que haya múltiples equipos trabajando sin coordinación en el mismo código, cosa
que he visto en aplicaciones monolíticas. Sí, cambiar a una arquitectura de microservicios es super motivante
y *megacool* y resuelve el problema, pero es más sencillo y efectivo asignar la propiedad de una parte del código a un equipo coordinarse adecuadamente, especialmente si el equipo son 20 ingenieros y no 2000.

Por último, puede ocurrir que la tecnología que utilizas para la aplicación no facilita la modularización 
del código. Veremos un ejemplo de este caso cuando realicemos los ejercicios más adelante en los
que usaremos HTML plano y tendremos muchos conflictos al intentar añadir elementos al menú de navegación
de la página.

Un caso similar tratamos en otro curso. El equipo trabajaba en la configuración de *routers*, que
contenían ficheros de miles de líneas que no se podían romper en ficheros más pequeños para luego combinarlos.
En ese caso el equipo estaba valorando la opción de crearse sus propios scripts que les permitiese hacer algo
del estilo.
