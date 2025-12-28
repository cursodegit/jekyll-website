---
layout: lab
title: "Taller 3.1: crear y borrar etiquetas"
---

# Taller 3.1 (version go con Visual Studio Code): crear y borrar etiquetas

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descarga 
- [go/github-client-taller-3-1.zip &#x1F4E5; ]({% link assets/zipfiles/talleres/go/github-client-taller-3-1.zip %})

## Requisitos
Este taller es continuación del taller 
[Taller 2.2: primeros *commits*]({% link docs/talleres/taller-2-2-go-vscode.md %}).

Es necesario haber completado el 
[taller 2.2]({% link docs/talleres/taller-2-2-go-vscode.md %}) para poder realizar 
este taller. Puedes importar el proyecto 
[`go/github-client-taller-2-2.zip`]({% link /assets/zipfiles/talleres/go/github-client-taller-2-2.zip %}) 
en `Visual Studio Code` y partir de él para hacer este taller.

## Objetivos

- Crear etiquetas
- Borrar etiquetas 

## Utilizando `Sourcetree`

Vamos a crear la etiqueta `v0.0` en la última confirmación del repositorio
que hicimos en el taller 2.2.

### Crear etiqueta
Situamos el ratón en la última confirmación y hacemos clic sobre ella con el 
botón derecho. Seleccionamos la opción _Tag..._:

![Botón derecho para seleccionar Tag...]({% link assets/img/talleres/go/crear-y-borrar-etiquetas-boton-derecho.png %})

En el cuadro de diálogo que nos aparece, introducimos `v0.0` en el nombre
del tag. Hacemos clic sobre botón _Add tag_:

![Formulario para crear etiqueta]({% link assets/img/talleres/go/crear-y-borrar-etiquetas-formulario-anadir-etiqueta.png %})
Una vez creada, podemos ver la etiqueta:
- En la historia del repositorio, delante del mensaje de la confirmación
- En la parte izquierda de la interfaz de `Sourcetree`, en la sección _Tags_

![Ver la etiqueta en Sourcetree]({% link assets/img/talleres/go/crear-y-borrar-etiquetas-historia-con-etiqueta.png %})
### Borrar una etiqueta 

Para borrar la etiqueta, desplegamos la sección _Tags_ en el menú izquierdo 
de _Sourcetree_. Buscamos la etiqueta que queremos borrar, en este caso `v0.0`,
y hacemos clic con el botón derecho sobre ella. Seleccionamos la opción 
_Delete v0.0_: 

![Botón derecho para borrar etiqueta]({% link assets/img/talleres/go/crear-y-borrar-etiquetas-boton-derecho-para-borrar.png %})
Nos saldrá un cuadro de diálogo para confirmar el borrado. Mantenemos la opción
_Remove tag from all remotes_ sin marcar, como se muestra en la siguiente
captura, y hacemos clic en OK:

![Confirmar borrado de la etiqueta]({% link assets/img/talleres/go/crear-y-borrar-etiquetas-confirmar-borrado.png %})

Tras esta operación, la etiqueta desaparecerá.

{% include alert_box.html content="Volver a crear la etiqueta v0.0 siguiendo los pasos indicados arriba antes de pasar la siguiente taller" %}

## Utilizando la consola

### Crear etiqueta 
Para crear la etiqueta por consola, utilizaremos el comando `git tag`. 
Creamos la etiqueta `v0.0` en la última confirmación, que en nuestro caso es 
`90336b5`:

```shell
> git tag v0.0 0206c90f
```

Podemos ver la etiqueta utilizando el comando `git log`:

```shell
> git log --oneline
0206c90 (HEAD -> main, tag: v0.0) Comando raiz usando cobra
20d1eb2 Añadir dependencias: cobra
d5ee988 Esqueleto del proyecto
```

### Listar etiquetas

Para listar las etiquetas utilizamos:

```shell
> git tag -l
v0.0
```

o directamente 

```shell
> git tag
v0.0
```

### Borrar etiqueta

Para borrar la etiqueta:

```shell
> git tag -d v0.0
Deleted tag 'v0.0' (was 0206c90)
```

El comando nos indica dónde estaba la etiqueta que acabamos de borrar.

Antes de terminar el taller, volvemos a crear la etiqueta, aunque utilizaremos un comando ligeramente diferente:

```shell
> git tag -a -m '' v0.0
```

En [el siguiente taller]({% link docs/talleres/taller-3-2-java-eclipse.md %}) explicaremos qué es la opción `-a` y hablaremos de los 
diferentes tipos de etiquetas. Por el momento, diremos este comando crea la etiqueta imitando el 
comportamiento por defecto de `Sourtree`.

## Mover etiquetas 

Como veremos en más detalle en las diapositivas, las etiquetas no se pueden 
mover. El procedimiento para mover una etiqueta sería borrarla y volverla
a crear en la confirmación correcta.

