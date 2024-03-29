
Llegados a este punto, ya tenemos el código listo para desplegar. Así que nos preguntamos 
*¿Cómo se despliega este proyecto?*. El primer paso del procedimiento es 
probar que funciona, así que le enviamos el ejecutable *al jefe* y esperamos su respuesta. 
Si nos pidiese algún cambio o mejora o detectase algún error, cambiaríamos el código, confirmaríamos los cambios
en la rama `listadoTickets`, le enviaríamos una nueva versión y esperaríamos su respuesta.

Supongamos que nos da el Ok. El siguiente paso de nuestro procedimiento es integrar el código en la rama `master`. 
Como vimos en las diapositivas, para evitar hacer las integraciones al reves, nos hacemos las siguientes preguntas:
- ¿En qué rama quiero integrar? en `master` -> hacemos `master` la rama activa 
- ¿Dónde está el código que quiero integrar? en `listadoTickets` -> ejecutamos `git merge listadoTickets`

