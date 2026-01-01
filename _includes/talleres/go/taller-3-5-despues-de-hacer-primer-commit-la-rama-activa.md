¿Qué ha pasado cuando hemos hecho `primer-commit` nuestra rama activa?
- Se ha cambiado el contenido de `.git/HEAD`, que ahora apunta a  `primer-commit`
- Se ha extraido al área de trabajo la instantánea a la que apunta la rama activa.

Si miramos nuestro código en `Visual Studio Code` observaremos que en nuestro área de trabajo estamos viendo de nuevo
el código que creamos en el [taller 2.1]({% link docs/talleres/taller-2-1-go-vscode.md %}). Veremos cómo desaparece
nuestro `rootCmd` del código en nuestro área de trabajo:

![Código en area de trabajo de primer-commit]({% link assets/img/talleres/go/cambiar-rama-activa-a-primer-commit-codigo.png %})


Como dijimos en las diapositivas, es como si `git` hubiese borrado el área de trabajo y extraído la nueva instantánea.
Vuelvo a hacer énfasis en que esto no es exactamente lo que está pasando, pero nos sirve de momento para
entender cómo está operando git. Entraremos en más detalle cuando veamos el índice de git.
