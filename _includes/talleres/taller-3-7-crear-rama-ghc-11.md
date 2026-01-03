Creamos una tarea en Jira para trabajar en el cambio que nos ha pedido la compañera. El ID de la tarea es `GHC-11`.

Para poder trabajar en la nueva tarea necesitamos poder **cambiar de contexto**, es decir, poder pasar de la tarea `GHC-10` a la 
tarea `GHC-11` y viceversa. En estos cambios de contexto es donde las ramas de `git` resultan extremadamente potentes.

Antes de crear la rama, vamos a añadir un poco de contexto: 
- La rama `GHC-10-comando-pr-list` está todavía sin terminar y no sabemos cuándo la terminaremos, 
  por lo que implementar el cambio que nos pide la compañera en la rama `GHC-10-comando-pr-list`, 
  y esperar a que esta rama se termine para desplegarlo todo junto tendría a nuestra compañera bloqueada hasta entonces.
  Este camino es posible y yo lo he seguido en muchas ocasiones cuando el trabajo que voy a hacer está casi terminado
  y el terminarlo está en un porcentaje muy alto bajo mi control.
  Sin embargo, en este taller seguiremos otro camino, que es dar prioridad a desbloquear a nuestra compañera.
- Podemos evitar este bloqueo cambiando de contexto. Para ello, buscamos una instantánea anterior sobre la que trabajar, 
  hacer el cambio que nos pide la compañera y desplegar. 
  ¿Qué instantánea seleccionamos? El sentido común nos indica que debe ser la última instantánea que está en producción 
- El puntero que nos indica qué instantánea está en producción es `main`, por lo que crearemos nuestra nueva rama 
  apuntando a la misma confirmación a la que apunta `main`

Como ves, para decidir dónde creo la rama nos hemos parado pensar qué queremos hacer (hemos 
respondido a la pregunta *¿qué queremos hacer con nuestra vida?* de la que hablamos en las diapositivas). Entiende la 
diferencia entre ese procedimiento y otras maneras de tomar la decisión como:
- pongo la rama en `main` porque es la más importante
- pongo la rama en `main` porque es la única que tengo 
- pongo la rama en `main` porque lo pone en `Stackoverflow`, o me lo dijo la `IA` o un señor en un curso de `git` 

Seguramente en un caso tan sencillo como este te pueda parecer innecesario hacer toda esta reflexión para crear una 
rama. A medida que el curso se complique, o cuando salgas de estos talleres enlatados y te enfrentes a un repositorio 
real, verás que sabiendo qué quieres hacer, realizar las operaciones de `git` es más fácil y cometerás menos errores.
