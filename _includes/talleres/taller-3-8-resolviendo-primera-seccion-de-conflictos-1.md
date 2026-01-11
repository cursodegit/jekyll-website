Resolvamos el conflicto en la primera sección:

```text
<<<<<<< HEAD
	"aalbagarcia/github-client/commands"
=======
	"github.com/fatih/color"
	"github.com/spf13/cobra"
>>>>>>> GHC-14-muestra-salida-con-colores
```

Fijemonos en la primera parte de estos conflictos:

```text
<<<<<<< HEAD
	"aalbagarcia/github-client/commands"
=======
```

`git` nos dice que en `HEAD` se está importando el fichero `aalbagarcia/github-client/commands`. Pero, ¿qué es `HEAD`? Es la rama
activa, que es `main` (¿recuerdas la pregunta ¿en qué rama quieres integrar?). Así que mientras que en `main` importamos
el módulo command, en la rama `GHC-14-muestra-salida-con-colores` se están importando los modulos `fatih/color` y `spf13/cobra`.
```text
=======
	"github.com/fatih/color"
	"github.com/spf13/cobra"
>>>>>>> GHC-14-muestra-salida-con-colores
```


Como no hemos escrito nosotros este código, **nos falta contexto para poder resolverlo**. Es decir, necesitamos entender
qué ha pasado con el código en ambas ramas y cuál es el estado final en el que tiene que quedar 
la aplicación para poder hacerlo.

Esta es una situación muy parecida a la que os vais a encontrar en la vida real, en la que tú has escrito el
código que está en tu rama y tienes que integrarlo con código que no has escrito tú. A veces podrás 
resolver tú solo el conflicto porque podrás obtener el contexto sin preguntar ni interactuar con nadie, y otras veces
deberás buscar a la o las personas del equipo que escribieron el código y trabajar con ellas para resolverlo.

Mirando la historia del proyecto, verás que se ha refactorizado mucho el código de la aplicación. Se han extraído 
varios módulos que se importan a través de `aalbagarcia/github-client/commands`. Si miramos el código 
de los módulos `auth.go`, `pr.go` e `init.go` (dentro de la carpeta `commands`) veremos como cada uno de ellos importa
`spf13/cobra`, por eso ese módulo ya no se importa en `main.go`.

Por otro lado, en la rama `GHC-14-muestra-salida-con-colores`, se importa el módulo `fatih/color` que luego se utiliza
en varios comandos para mostrar la salida usando colores. Pero en la rama `GHC-14-muestra-salida-con-colores`, esos
cambios se hacen en el fichero `main.go`.

Para resolver este conflicto debemos borrar todo el texto entre los marcadores 
`<<<<<<<< HEAD` y `>>>>>>> GHC-14-muestra-salida-con-colores` y mantener únicamente la siguiente línea:

```text
	"aalbagarcia/github-client/commands"
```

cosa que puedes hacer manualmente borrando las líneas que sobran, 
o haciendo clic sobre la opción *Accept Current Change* del menú contextual que
ofrece `Visual Studio Code`. Pero no hemos terminado aquí, tendremos que importar el módulo
`fatih/color` en aquellos módulos que lo utilizan. 

