#### Git sólo sabe hacer tres cosas

1. Crear instantáneas de código (_snapshots_)
1. Almacenar esos snapshots en una estructura de datos
1. Gestionar punteros

Git trabaja a nivel de (_**snapshot**_)

No trabaja a nivel de fichero

Notes:
Siguiendo con la metáfora que comentábamos en las diapositivas anteriores,
git se puede entender como un conjunto de comandos que nos permite gestionar 
una estructura de datos. Estos comandos nos permiten:

- Generar snapshots de código: Una de las principales diferencias entre git y otros
  sistemas de control de versiones, como Subversion, es que trabaja a nivel de 
  _snapshot_. Es decir, git hace _snapshots_ de nuestro código en cada commit y esos
  _snapshots_ contienen todos los ficheros del proyecto. Cada uno de los _snapshots_
  que generamos se convertirá en un nodo de la estructura de datos
- Actuar sobre la historia del repositorio: los _snapshots_ se almacenan en una
  estructura de datos (Grafo acíclido dirigido, DAG por sus siglas en inglés) que
  conforman la historia de nuestro código.
- Gestionar referencias sobre esa estructura de datos: crear ramas o tags, sincronizar
  con un repositorio remoto usando `fetch`, hacer un `merge` o el comando `reset --hard` son ejemplos
  de operaciones sobre las referencias que apuntan a nuestra estructura de datos

^^^^^^

#### Lo que no _sabe_ Git

- Qué es lo que almacenamos en los commits
- Cómo nos queremos organizar para trabajar, por ejemplo cuántos entornos tenemos
- Qué está en producción y qué no 

Notes:

Como hemos comentado en la diapositiva anterior, git sólo sabe operar sobre una
estructura de datos, nada más. Nos da los comandos para generarala y manipularla,
pero cómo queramos usarla **es nuestra responsabilidad**. No almacena ninguna información
referente a flujos de trabajo (desarrollo vs staging vs producción), importancia 
relativa de unos commits o ramas frente a otras (`master` es más importante que una 
rama de funcionalidad) ni sabe qué es lo que estamos almacenando en los _snapshots_.
Puede ser código fuente o nuestro diario personal, le da lo mismo.


^^^^^^

En las siguientes secciones del curso entraremos en el detalle de qué son cada una
de estas tres cosas
