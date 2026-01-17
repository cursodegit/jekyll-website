## Locura

Notes:

En esta sección vamos a profundizar en nuestro conocimiento de la estructura de datos de git.
Y sí, nos vamos a volver locos. Pero no te preocupes, es una locura controlada. Vamos a 
romper el repositorio hasta el punto de tener que recuperarlo de una copia de seguridad.

Rompiendo y recuperando el repositorio, vamos a entender mejor cómo funciona git por dentro.

^^^^^^

#### Motivación

- Estas operaciones no se hacen en el día a día
- Ejercicio para entender mejor cómo funciona el grafo de git

Notes:

Como hemos visto en las secciones anteriores, `git` hace snapshots de código que almacena en una estructura de datos.
Esta estructura de datos es un grafo dirigido acíclico, que se va ramificando a medida que creamos nuevas ramas y 
y confirmando nuestros cambios. Entender cómo se comporta este grafo es fundamental para entender cómo funciona git.

En esta sección vamos a hacer *cosas raras* con nuestro repositorio. Operaciones que raramente se realizan en el día a día.

El objetivo es acabar *rompiendo* el repositorio, borrando toda la historia para recuperarlo desde una copia de seguridad.

^^^^^^

#### Laboratorio: Copia de seguridad

[Ir al Taller 4.1](../../talleres/taller-4-1-go-vscode.html)

Notes:

El primer paso es hacer una copia de seguridad del repositorio. Ya sé que por la dinámica que estamos siguiendo, dispones 
de varias copias de seguridad del repositorio en los anteriores laboratorios del curso. Aún así, no está de más
que hagas la tuya propia ya que, como veremos a lo largo del capítulo 4, esa será la copia de *tu* repositorio. Si te
descargas y utilizas las copias de los talleres, recuperarás una copia de *mi* repositorio. Cosas que no verás en 
*mi* repositorio serán por ejemplo tus etiquetas o tus ramas locales si has creado alguna durante el curso.


