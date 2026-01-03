Terminada la tarea `GHC-11`, vamos a desplegarla. En este proyecto, el primer paso para desplegar es enviarle el 
ejecutable *al jefe* para que lo pruebe. Supongamos que nuestro proceso de control de calidad y pruebas 
aprueba la nueva versión y estamos listos para desplegar. En este proyecto para desplegar debemos 
integrar todos los cambios en `main`, generar un ejecutable nuevo y distribuirlo.

Nos hacemos las preguntas que comentamos en las diapositivas y que nos ayudarán a 
integrar los cambios en la rama correcta. La primera pregunta es ¿en qué rama quiero integrar?
La respuesta es `main`, ya que estamos desplegando, por lo que hacemos `main` la rama activa. 


