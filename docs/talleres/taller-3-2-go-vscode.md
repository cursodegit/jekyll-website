---
layout: lab
title: "Taller 3.2: Tipos de etiquetas"
---

# Taller 3.2 (version Go con Visual Studio Code): tipos de etiquetas

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descarga 
- [go/githug-client-taller-3-2.zip &#x1F4E5; ]({% link assets/zipfiles/talleres/go/github-client-taller-3-2.zip %})

## Requisitos

Este taller es continuación del taller 
[Taller 3.1: crear etiquetas y ramas]({% link docs/talleres/taller-3-1-go-vscode.md %}).

Es necesario haber completado el 
[taller 3.1]({% link docs/talleres/taller-3-1-go-vscode.md %}) para poder realizar 
este taller. Puedes importar el proyecto 
[go/githug-client-taller-3-1.zip &#x1F4E5; ]({% link assets/zipfiles/talleres/go/github-client-taller-3-1.zip %})
en `Visual Studio Code` y partir de él para hacer este taller.

## Objetivos

- Crear etiquetas ligeras
- Crear etiquetas anotadas
- Entender la diferencia entre ambos tipos de etiquetas

## Crear una etiqueta ligera y una anotada utilizando `Sourcetree`

Como hemos comentado en las diapositivas, `Sourcetree` crea etiquetas anotadas por defecto.

En el cuadro de diálogo que se despliega al crear una etiqueta, podemos introducir:
- Nombre de la etiqueta
- Comentario (desplegando las opciones avanzadas)

![Crear etiqueta anotada en sourcetree]({% link assets/img/talleres/go/crear-etiqueta-anotada-sourcetree.png %})

Si queremos crear una etiqueta ligera:
- Desplegamos las opciones avanzadas
- Seleccionamos la opción *Lightweight tag*

![Crear etiqueta ligera en sourcetree]({% link assets/img/talleres/go/crear-etiqueta-ligera-sourcetree.png %})

Utilizando `Sourcetree`, crearemos dos etiquetas que apunten a la última confirmación de cambios
del repositorio:

- Una etiqueta ligera de nombre `v0.0-ligera`
- Una etiqueta anotada de nombre `v0.0-anotada` con el mensaje "*Inicio del desarrollo*"

Tras crearlas, veremos en `Sourcetree` estas dos etiquetas apuntando a la última confirmación de cambios del 
repositorio:

![Creadas etiquetas ligera y anotada]({% link assets/img/talleres/go/crear-etiqueta-ligera-y-anotada-en-sourcetree.png %})

Cuando hay más de tres referencias apuntando a un objeto en `Sourcetree`, en lugar de mostrarlas todas, se muestra una
elipsis. Situando el puntero del ratón sobre ese símbolo se despliegan todas las referencias que apuntan a ese objeto.

## Utilizando línea de comandos

{% include alert_box.html content="Si ya has creado las etiquetas usando Sourcetree, los siguientes comandos te darán un error al ejecutarlos. Puedes borrar las etiquetas antes de continuar o cambiar los nombres antes de ejecutar los comandos" %}

Para crear la etiqueta ligera `v0.0-ligera` utilizamos el comando `git tag` sin más opciones 
que el nombre de la etiqueta:

```shell
> git tag v0.0-ligera
```

Para crear la etiqueta anotada `v0.0-anotada` utilizamos la opción `-m`:

```shell
> git tag -m"Inicio del desarrollo" v0.0-anotada
```

La opción `-m` del comando `git tag` implica la opción `-a` que es la que crea una 
etiqueta anotada.

## Inspeccionando las etiquetas


{% include alert_box.html content="En esta sección utilizaremos la consola.
Recuerda que puedes abrir una consola con un interprete `bash` en Windows utilizando el botón <code>Terminal</code> de la barra de botones de <code>Sourcetree</code>" %}

Vamos a ver el contenido de los dos ficheros:

```powershell
> cat .git/refs/tags/v0.0-ligera
0206c90f18139086d25beb24b9abf76e2398768

$ cat .git/refs/tags/v0.0-anotada
d3cbdb25157bb20a7b3ff9fd37ebfc4c10b90081
```

Si miramos las capturas de `Sourcetree` un poco más arriba, vemos que ambas etiquetas apuntan 
a la última confirmación de cambios que creamos: `0206c90f`. Sin embargo,
**sólo el fichero correspondiente a la etiqueta `v0.0-ligera` contiene el *checksum* de la confirmación**.
El otro fichero (`.git/refs/tags/v0.0-anotada`) contiene el *checksum* de otro objeto de `git`.

Utiliando el comando `git cat` vamos a inspeccionar este objeto:

```shell
> git cat-file -t d3cbdb25157bb20a7b3ff9fd37ebfc4c10b90081
tag
```

Vemos que es un objeto de tipo `tag`. Inspeccionemos el objeto para ver qué información contiene:
```shell
> $ git cat-file tag 38cda6be6091efdc4ca4b1f4fb2b55805b48a19b
object 0206c90f18139086d25beb24b9abf76e23987685
type commit
tag v0.0-anotada
tagger Alfonso Alba García <alfonso@alfonsoalba.com> 2685087832 +0100

Inicio del desarrollo
```

- Objeto de `git` al que apunta la etiqueta: `object 0206c90f...`
- El nombre de la etiqueta
- El nombre y el correo electrónico del creador de la etiqueta
- La fecha y hora de creación

## Viendo los mensajes de las etiquetas 

### Utilizando `Sourcetree`

La manera de ver los mensajes es accediendo a los detalles de la etiqueta en el menú 
lateral izquierdo. Desplegamos la sección _Tags_, buscamos la etiqueta en cuestión
y desplegamos el menú contextual haciendo clic con el botón derecho:

![Ver detalles de etiqueta en Sourcetree]({% link assets/img/talleres/go/ver-info-etiqueta-en-sourcetree.png %})

Seleccionamos _Details_ para ver la información:

![Detalle de etiqueta]({% link assets/img/talleres/go/ver-info-etiqueta-en-sourcetree-detalles.png %})

### Utilizando la consola 

Utilizamos la opción `-n 1` del comando para listar las etiquetas:

```shell
$ git tag -n1 -l
v0.0
v0.0-anotada    Inicio del desarrollo
v0.0-ligera     Comando raiz usando cobra
```

¿Porqué la etiqueta `v0.0` no contiene un mensaje? Recuerda que esta etiqueta la creamos 
usando `Sourcetree`. `Sourcetree` crea etiquetas anotadas por defecto, pero cuando la creamos
no pusimos ningún texto, así que se guardó un mensaje vacío. Podemos verlo utilizando 
el comando `git cat-file`:

```shell
$ git cat-file tag `cat .git/refs/tags/v0.0`
object 0206c90f18139086d25beb24b9abf76e23987685
type commit
tag v0.0
tagger Alfonso Alba García <alfonso@alfonsoalba.com> 2685087832 +0100


```

