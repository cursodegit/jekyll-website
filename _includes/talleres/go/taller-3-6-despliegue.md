
Llegados a este punto, ya tenemos el código listo para desplegar. Así que nos preguntamos 
*¿Cómo se despliega este proyecto?*. El primer paso del procedimiento es 
probar que funciona, para lo que necesitamos pasar los tests y el proceso de control calidad.

Como vimos al inicio del taller, en este proyecto el proceso de pruebas y control de calidad 
consiste en generar el ejecutable y enviarse *al jefe* para que nos de su Ok, así que vamos a ello.

Lanzamos el comando `go build`:

```powershell
> go build
```

Este comando crea un fichero `github-client.exe`, se lo enviamos a la persona que lo va a probar, y esperamos.
Si nos pidiese algún cambio o mejora o detectase algún error, cambiaríamos el código, confirmaríamos los cambios
en la rama `comando-auth`, le enviaríamos una nueva versión y esperaríamos su respuesta.

Supongamos que nos da el Ok. El siguiente paso de nuestro procedimiento es integrar el código en la rama `main`. 
Como vimos en las diapositivas, para evitar hacer las integraciones al reves, nos hacemos las siguientes preguntas:
- ¿En qué rama quiero integrar? en `main` -> hacemos `main` la rama activa usando `git switch main`
- ¿Dónde está el código que quiero integrar? en `comando-auth` -> ejecutamos `git merge comando-auth`

