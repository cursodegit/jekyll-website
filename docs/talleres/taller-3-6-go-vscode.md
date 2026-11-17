---
layout: lab
title: "Taller 3.6: feature branches y fast-forward merge"
---

# Taller 3.6 (version Go con Visual Studio Code): ramas de funcionalidad y *fast-forward merge*

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descarga 
- [go/github-client-taller-3-6.zip &#x1F4E5; ]({% link assets/zipfiles/talleres/go/github-client-taller-3-6.zip %})

## Requisitos

Este taller es continuación del taller 
[Taller 3.4: crear etiquetas y ramas]({% link docs/talleres/taller-3-4-go-vscode.md %}) (el taller 3.5 no tiene fichero descargable) .

Es necesario haber completado el 
[taller 3.4]({% link docs/talleres/taller-3-4-go-vscode.md %}) para poder realizar 
este taller. Puedes importar el proyecto [`go/github-client-taller-3-4.zip`]({% link assets/zipfiles/talleres/go/github-client-taller-3-4.zip%})  en 
`Visual Studio Code` y partir de él para hacer este taller.

## Objetivos

- Utilizar ramas de funcionalidad para cambiar de contexto
- Integrar ramas utilizando *fast-forward merge*


## Crear *token* en GitHub 
{% include talleres/crear-token-github.md %}

## Convenios

Al empezar a trabajar con ramas, vamos a adoptar ciertos convenios:
- Crearemos una rama para cada funcionalidad que vayamos a desarrollar
- Usaremos nomenclatura *kebab-case* para nombrar las ramas 
- La rama `main` debe apuntar siempre al último código que hemos distribuido a nuestros usuarios 

Otro convenio que voy a adoptar durante el taller es que voy a confirmar cambios cuando:
- Tenga código que implemente una funcionalidad y funcione, aunque lo tenga que refactorizar
- Si tengo una funcionalidad grande, alcance hitos durante su desarrollo
- Alcance un punto en el que tenga una nueva versión para distribuir

Finalmente, utilizaré [*conventional commits*](https://www.conventionalcommits.org/en/v1.0.0/) para 
los mensajes cuando confirme los cambios.

## Despliegues

En un proyecto real, tendríamos que responder a ciertas preguntas como por ejemplo cómo vamos a desplegar el 
código en producción. Es decir, dónde almacenamos la aplicación, cómo verificamos que la aplicación funciona 
correctamente antes de distribuir una nueva versión y cómo la distribuimos a nuestros usuarios.

Siendo esto un taller de un curso de `git`, vamos a buscar una manera sencilla de responder a estas preguntas 
para dar contexto al procedimiento que seguiremos durante el ejercicio:
- Para probar que la aplicación funciona, le enviaremos el ejecutable *al jefe* para que lo pruebe y de el OK
- Integramos en la rama `main` el código de la nueva versión (cuando tengamos el Ok *del jefe*, por supuesto)
- La distribuiremos mediante un email con un enlace a la carpeta para que los usuario se instalen la nueva versión

Como os imagináis, únicamente realizaremos la segunda de las acciones durante el taller, aunque me escucharéis hablar de 
los otros pasos del procemiento para darle contexto a lo que estamos haciendo.

Es decir, cada vez que pregunte _¿Cómo se despliega este proyecto?_ podréis venir aquí a encontrar la respuesta.

## Utilizando `Sourcetree`

### Crear rama 

En `Sourcetree`, creamos una rama que llamaremos `comando-auth`. Vimos cómo crear ramas 
en el [Taller 3.4]({% link docs/talleres/taller-3-4-go-vscode.md %}). Hacemos clic con el botón derecho sobre
la última confirmación de cambios del repositorio, seleccionamos *Branch...* en el menú contextual.
Se nos abrirá el cuadro de diálogo para crear la rama. Rellenamos los valores y dejamos 
marcada la opción *Checkout New Branch*:

![Crear rama comando-auth]({% link assets/img/talleres/go/taller-3-6-sourcetree-crear-rama-comando-auth.png %})

Hacemos clic sobre el botón *Create Branch* y creamos la rama:

![Rama comando-auth creada]({% link assets/img/talleres/go/taller-3-6-sourcetree-rama-comando-auth-creada.png %})


### Primeros cambios: comando `auth login` 

{% include talleres/go/taller-3-6-vscode-primeros-cambios.md %}

Volvemos a `Sourcetree` y confirmamos los cambios utilizando el mensaje *feat: Implementa el comando auth login*. En la descripción
de la confirmación de cambios podemos añadir el siguiente texto:

> Creamos una primera implementación sencilla del comando `auth login` que pregunta
> al usuario el token. En un futuro podemos desarrollar una integración con oauth 
> para obtener el token. Dado que esto es una prueba de concepto, he decidido
> simplificar este paso para avanzar con otras funcionalidades.

Tras confirmarlos, este será el estado de nuestro repositorio:


![Primeros cambios confirmados a comando-auth]({% link assets/img/talleres/go/taller-3-6-sourcetree-primeros-cambios-confirmados-a-comando-auth.png %})

Vemos cómo el repositorio sigue siendo una lista simplemente enlazada,
que se representa como una línea recta. No se tuerce ni se birfurca.

Además, hemos incluido en la descripción de la confirmación de cambios un texto que describe por qué hemos decidido
implementar el comando de esta manera. Esa información no se puede ver en el código fuente por lo que incluirla
en la descripción ayuda a la persona que revise el código a saber por qué he optado por esta implementación.

### Comando `auth status`

{% include talleres/go/taller-3-6-vscode-segunda-confirmacion-de-cambios.md %}

Confirmamos los cambios en `Sourcetree` con el mensaje *feat: implementa el comando auth status*:

A la vez que hicimos en la confirmación de cambios previa, vamos a incluir un texto en la descripción
que explique por qué hemos implementado el comando `auth status` de esta manera:

> Para comprobar que el token es correcto, implemento una llamada a un endpoint
> de la API rest que no dependa de los permisos que tiene el token. Uno de esos 
> endpoints es el de introspección (`/user`) y por eso lo he escogido.

![Confirmación de segundos cambios]({% link assets/img/talleres/go/taller-3-6-sourcetree-segundos-cambios-confirmados-a-comando-auth.png %})

Tras confirmar los cambios, comprobamos en `Sourcetree` que el repositorio sigue siendo una lista simplemente enlazada.

### Despliegue 

{% include talleres/go/taller-3-6-despliegue.md %}

Hacemos `main` la rama activa en `Sourcetree` haciendo doble clic sobre ella:

![Despliegue en Sourcetree paso 1]({% link assets/img/talleres/go/taller-3-6-sourcetree-despliegue-paso-1.png %})

Hacemos clic sobre el botón _Merge_ en el menú superior. El código que queremos integrar está en `comando-auth`,
así que en la ventana emergente que aparece, buscamos la rama `comando-auth` en el grafo, seleccionamos 
la rama y hacemos clic sobre el botón *Ok*:

![Despliegue en Sourcetree paso 2]({% link assets/img/talleres/go/taller-3-6-sourcetree-despliegue-paso-2.png %})

Como resultado, la rama `main` apuntará a la misma confirmación a la que apunta la rama `comando-auth`, ya que 
estamos ante un *fast-forward merge*:

![Despliegue en Sourcetree paso 3]({% link assets/img/talleres/go/taller-3-6-sourcetree-despliegue-paso-3.png %})

Como comentamos en las diapositivas, `git` sabe que puede hacer un *fast-forward merge* y lo hace, ya que este
es el comportamiento por defecto. Por eso no vemos bifurcaciones en el grafo.

Llegados a este punto, estamos en condiciones de construir un nuevo ejecutable, subirlo a la carpeta compartida
y enviar el correo electrónico a nuestros usuarios para que se descarguen la nueva versión.

## Utilizando la consola

### Crear rama

Creamos la rama `comando-auth` y la convertimos en la rama activa. Podemos hacer las dos operaciones
a la vez utilizando la opción `--create` del comando `git switch`:

```shell
> git switch --create comando-auth 
```

Al no indicarle al comando dónde queremos crear la rama, esta se creará apuntando a la misma
confirmación a la que apunta `HEAD` que en este caso es `main`. Podemos verlo usando el comando `git log`:

```shell
> git log --graph --oneline
* 0206c90 (HEAD -> comando-auth, tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, main, master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```

o el comando `git branch`:

```powershell
> git branch -v
* comando-auth  9611db0 feat: implementa el comando auth status
  main          9611db0 feat: implementa el comando auth status
  master        0206c90 Comando raiz usando cobra
  primer-commit d5ee988 Esqueleto del proyecto
```


### Primeros cambios: comando `auth login` 

{% include talleres/go/taller-3-6-vscode-primeros-cambios.md %}

Veamos los cambios que tenemos en nuestro área de trabajo. Para ello
ejecutamos el comando `git status`:

```shell 
> git status
On branch comando-auth
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   main.go

no changes added to commit (use "git add" and/or "git commit -a")
```

Subimos los cambios al *staging area*:

```shell 
> git add .
```

Confirmamos los cambios utilizando el mensaje *feat: Implementa el comando auth login*. En la descripción
de la confirmación de cambios podemos añadir el siguiente texto:

> Creamos una primera implementación sencilla del comando `auth login` que pregunta
> al usuario el token. En un futuro podemos desarrollar una integración con oauth 
> para obtener el token. Dado que esto es una prueba de concepto, he decidido
> simplificar este paso para avanzar con otras funcionalidades.



```shell 
> git commit -m'feat: Implementa el comando auth login.
Creamos una primera implementación sencilla del comando `auth login` que pregunta
al usuario el token. En un futuro podemos desarrollar una integración con oauth 
para obtener el token. Dado que esto es una prueba de concepto, he decidido
simplificar este paso para avanzar con otras funcionalidades.'

[comando-auth 5344602] feat: Implementa el comando auth login
 1 file changed, 65 insertions(+)
```

Tras confirmar los cambios, vemos como el repositorio sigue siendo una lista 
simplemente enlazada, que se representa como una línea recta. 
No se tuerce ni se birfurca:


```shell 
> $ git log --all --oneline --graph
* 5344602 (HEAD -> comando-auth) feat: Implementa el comando auth login
* 0206c90 (tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, master, main) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```

### Comando `auth status`

{% include talleres/go/taller-3-6-vscode-segunda-confirmacion-de-cambios.md %}

Confirmamos los cambios con el mensaje *feat: implementa el comando auth status*. 
A la vez que hicimos en la confirmación de cambios previa, vamos a incluir un texto en la descripción
que explique por qué hemos implementado el comando `auth status` de esta manera:

> Para comprobar que el token es correcto, implemento una llamada a un endpoint
> de la API rest que no dependa de los permisos que tiene el token. Uno de esos 
> endpoints es el de introspección (`/user`) y por eso lo he escogido.

```powershell
> git add .
> git commit -m'feat: implementa el comando auth status

[comando-auth 9611db0] feat: implementa el comando auth status
 1 file changed, 83 insertions(+), 1 deletion(-)
```

Tras confirmar los cambios, comprobamos que el repositorio sigue siendo una lista simplemente enlazada:

```powershell
 git log --all --oneline --graph
* 9611db0 (HEAD -> comando-auth) feat: implementa el comando auth status
* 5344602 feat: Implementa el comando auth login
* 0206c90 (tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, main, master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```

### Despliegue 

{% include talleres/go/taller-3-6-despliegue.md %}

Vemos cuál es la rama activa:

```shell
$ git branch --show-current
comando-auth
```

Hacemos `main` la rama activa con el comando `git switch` en caso de que no lo sea:

```shell
> git switch main

Switched to branch 'main'
```

Integramos el código de la rama `comando-auth`:

```shell
> git merge comando-auth
Updating 0206c90..9611db0
Fast-forward
 main.go | 147 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 147 insertions(+)
```

Como comentamos en las diapositivas, `git` sabe que puede hacer un *fast-forward merge* y lo hace, ya que este
es el comportamiento por defecto. Por eso no vemos bifurcaciones en el grafo.

Llegados a este punto, estamos en condiciones de construir un nuevo ejecutable, subirlo a la carpeta compartida
y enviar el correo electrónico a nuestros usuarios para que se descarguen la nueva versión.

