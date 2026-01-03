Terminada la tarea `GHC-10`, vamos a desplegarla. En este proyecto, el primer paso para desplegar es enviarle el 
ejecutable *al jefe* para que lo pruebe. Tendremos que avisar 
al jefe de que en este ejecutable que le enviamos, **el comando `auth status` no funciona con la variable de entorno `GHC_TOKEN`**. 
Cuando pruebe la versión final a distribuir verá que todo funciona correctamente. Esto es consecuendia de la 
decisión que tomamos tras terminar `GHC-11` de no integrar los cambios de `main` en nuestra rama. Aunque en aquel 
momento comentamos que los dos caminos eran válidos ya que acabaríamos con el mismo código fuente,
haber tomado esa decisión tiene esta consecuencia ¿Consideras que hubiese sido mejor seguir el otro camino?

Supongamos que recibimos luz verde para desplegar. De nuevo nos hacemos las dos preguntas que nos ayudarán a 
integrar los cambios. La primera es ¿en qué rama quiero integrar?. La respuesta es en `main` ya que estamos desplegando.


