---
layout: lab
title: "Taller 3.8: Resolución de conflictos con merge"
---

# Taller 3.8 (version Go con Visual Studio Code): Resolución de conflictos durante `git merge`

## Índice

* This will become a table of contents (this text will be scrapped).
{:toc}

## Descargas 
- Antes del taller: [go/github-client--taller-3-8-inicio.zip &#x1F4E5; ]({% link assets/zipfiles/talleres/go/github-client-taller-3-8-inicio.zip %})
- Ejercicio finalizado: [go/github-client-taller-3-8.zip &#x1F4E5; ]({% link assets/zipfiles/talleres/go/github-client-taller-3-8.zip %})

## Requisitos

{% include alert_box.html content='Debes descargar el fichero <code>github-client-taller-3-8-inicio.zip</code> e importar el proyecto en `Visual Studio Code` para poder realizar este taller'%}

Descarga e importa el proyecto [`go/github-cient--taller-3-8-inicio.zip`]({% link assets/zipfiles/talleres/go/github-client-taller-3-8-inicio.zip %})  en 
`Visual Studio Code`. A diferencia de los talleres anteriores, que empezaban donde terminaba un taller 
anterior, en este taller partimos de un repositorio que ya contiene las ramas y el código 
con el que vamos a trabajar.


## Qué vamos a hacer

Queremos desplegar las ramas `GHC-13-crea-package-commands` y la rama `GHC-14-muestra-salida-con-colores` que se muestran a continuación:

![Punto de partida]({% link assets/img/talleres/go/taller-3-8-sourcetree-punto-de-partida.png %})

Al hacer las integraciones, tendremos conflictos que deberemos resolver. ¿Porqué tendremos conflictos? Si miras el código, verás que en la rama 
`GHC-14-muestra-salida-con-colores` modifica el código de los comandos `autStatusCmd` y `prListCmd`, mientras que en la 
rama `GHC-13-crea-package-commands` esos comandos se extraen la paquete `commands`.

## Objetivos

Aprender a resolver conflictos durante una integración de ramas usando el comando `git merge`.

## Convenios

Seguiremos los mismos convenios sobre ramas que utilizamos en el 
[taller 3.7]({% link docs/talleres/taller-3-7-java-eclipse.md %}). 

## Despliegues

Seguiremos el mismo procedimiento de despliegue que describimos en el 
[taller 3.7]({% link docs/talleres/taller-3-7-java-eclipse.md %}). 

## Utilizando `Sourcetree` 

### ¿Qué queremos hacer?

Utilizaremos las preguntas para guiarnos en el proceso. Recuerda que lo más 
importante al utilizar `git` es saber qué quieres hacer ya que dependiendo de 
la respuesta a esa pregunta y el contexto, ejecutarás unos comandos u otros. 

La primera pregunta que tenemos que responder es *¿Qué quiero hacer con mi vida?* La
respuesta a esa pregunta es *desplegar las ramas `GHC-13-crea-package-commands`
`GHC-14-muestra-salida-con-colores`*.

La siguiente pregunta es *¿En qué rama quiero integrar?*. Recordamos que para desplegar en 
este proyecto debemos integrar en `main`, compilar un nuevo ejecutable y distribuirlo. 
La respuesta a la pregunta entonces es que queremos integrar en la rama `main`, así que hacemos 
`main` la rama activa haciendo doble clic sobre ella:

![main rama activa]({% link assets/img/talleres/go/taller-3-8-sourcetree-main-rama-activa.png %})

La siguiente pregunta es *¿Dónde está el código que queremos integrar?* En este caso,
la respuesta a la pregunta es que el código que queremos integrar en `main` está en 
`GHC-12-extraePrintIssues` y en `GHC-13-usaColorEnListadoDeTickets`, 
**lo que significa que tendremos que integrar dos veces**.

```powershell
> git switch main
Switched to branch 'main'
```

### Integrando `GHC-13-crea-package-commands`

Empezamos por integrar la rama `GHC-13-crea-package-commands`. Siguiendo las mismos 
pasos que en talleres anteriores, hacemos clic sobre el botón *Merge* de `Sourcetree`
y seleccionamos la rama `GHC-13-crea-package-commands`:

![Merge GHC-13 paso 1]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-13-paso-1.png %})

Hacemos clic en el botón `Ok` para integrar. Se trata de un *fast-forward merge* por lo que la rama `main` pasará a apuntar 
a la misma confirmación a la que apunta `GHC-13-crea-package-commands`:

![Merge GHC-13 paso 2]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-13-paso-2.png %})

```powershell
$ GIT_COMMITTER_DATE=$DATE GIT_AUTHOR_DATE=$DATE git merge GHC-13-crea-package-commands 
Updating df0e854..82d8706
Fast-forward
 commands/auth.go                | 104 ++++++++++++++++++++++++
 client.go => commands/client.go |  75 ++++++++++-------
 commands/init.go                |  26 ++++++
 commands/pr.go                  |  68 ++++++++++++++++
 main.go                         | 174 +---------------------------------------
 types.go                        |  16 ----
 6 files changed, 245 insertions(+), 218 deletions(-)
 create mode 100644 commands/auth.go
 rename client.go => commands/client.go (90%)
 create mode 100644 commands/init.go
 create mode 100644 commands/pr.go
 delete mode 100644 types.go
```
```powershell
> git log --all --oneline --graph
* 099ddf6 (GHC-14-muestra-salida-con-colores) feat: utiliza colores salida de comandos
* bebc268 chore: agrega dependencia fatih/color para mostrar salida con colores
| * 82d8706 (HEAD -> main, GHC-13-crea-package-commands) refactor: extraer comandos y cliente a paquete modular commands/
|/
* df0e854 (GHC-12-refactoring) refactor: encapsular lógica GitHub en cliente
* 06d0362 refactor: usa GitHubClient para validar token
* e731669 refactor: extrae tipos a types.go
*   aa46ac1 Merge branch 'GHC-10-comando-pr-list'
|\
| * 9200582 (GHC-10-comando-pr-list) feat: pr list lee token the GHC_TOKEN si está definida
| * e29ba6b feat: comando pr list muestra autor y enlace
| * 9ba307b chore: Mejora en la gestión de errores en comando pr list
| * f2b1636 feat: Implementa comando pr list
* | c494502 (GHC-11-token-en-variable-de-entorno) feat: comando auth status utiliza GHC_TOKEN para leer el token
|/
* 9611db0 (comando-auth) feat: implementa el comando auth status
* 5344602 feat: Implementa el comando auth login
* 0206c90 (tag: v0.0-ligera, tag: v0.0-anotada, tag: v0.0, master) Comando raiz usando cobra
* 20d1eb2 Añadir dependencias: cobra
* d5ee988 (primer-commit) Esqueleto del proyecto
```



### Integrando la rama `GHC-14-muestra-salida-con-colores`

Realizada la primera integración, nos preguntamos si hemos conseguido lo que queríamos 
conseguir con nuestra vida. Lo que queríamos conseguir era 
*desplegar las ramas `GHC-13-crea-package-commands` y `GHC-14-muestra-salida-con-colores`*, 
así que todavía no hemos terminado. Nos falta integrar la rama `GHC-14-muestra-salida-con-colores`. ¡Vamos a ello!

Volvemos a preguntarnos *¿En qué rama quiero integrar?*. La respuesta a esta pregunta sigue 
siendo `main` porque lo que quiero hacer con mi vida es desplegar, y para desplegar en este 
proyecto hay que integrar en `main`, generar un nuevo ejecutable y distribuirlo. Nos aseguramos de que 
`main` sigue siendo la rama activa antes de continuar. Si no lo es, hacemos doble clic sobre 
ella.

Por último, nos preguntamos *¿En qué rama está el código que quiero integrar?*. La respuesta 
a esta pregunta es `GHC-14-muestra-salida-con-colores`. Hacemos clic sobre el botón *Merge* 
y seleccionamos la rama `GHC-14-muestra-salida-con-colores`:


![Merge GHC-14 paso 1]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-1.png %})

Al darle al botón *Ok*, `Sourcetree` nos indicará que `git` no ha podido hacer 
la operación porque ha encontrado conflictos:

![Merge GHC-14 paso 2 conflictos]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-2-conflictos.png %})

Hacemos clic sobre *Close*. `Sourcetree` nos muestra que hemos tenido conflictos al hacer la integración:
- En el grafo, vemos que aparece el *merge commit* en gris y en la descripción se indica *Uncommitted changes*
- Los ficheros con conflictos se muestran tanto en el área de ensayo como en el área de trabajo con un icono de 
  peligro (⚠️)

![Merge GHC-14 paso 2 indicación de conflictos]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-2-indicacion-conflictos.png %})

```powershell
$ DATE='2055-02-01T17:05:17' --->>> importante usar fecha posterior a esta si  se tiene que repetir la operación por el reflog
$  GIT_COMMITTER_DATE=$DATE GIT_AUTHOR_DATE=$DATE git merge GHC-14-muestra-salida-con-colores 
Auto-merging main.go
CONFLICT (content): Merge conflict in main.go
Automatic merge failed; fix conflicts and then commit the result.

> git status
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Changes to be committed:
        modified:   go.mod
        modified:   go.sum

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   main.go
```

### Resolviendo los conflictos

Como mostramos en las diapositivas, necesitamos mezclar el código de aquellas partes del fichero que `git` no pudo 
mezclar. Abrimos el fichero `main.go` en `Visual Studio Code` y vemos 
cómo `git` nos ha marcado los conflictos usando los marcadores `<<<<<<<`, `=======` y `>>>>>>>`:


![Merge GHC-14 paso 3 ver conflictosd  en fichero]({% link assets/img/talleres/go/taller-3-8-vscode-merge-ghc-14-paso-3-ver-conflictos.png %})

Junto a los marcadores que utiliza `git`, verás también un menú contextual con varias opciones: *Accept Current Change*, 
*Accept Incoming Change*, *Accept Both Changes* y *Compare Changes*. Este menú es una funcionalidad de `Visual Studio Code` por
lo que si estás utilizando otro editor de texto, no dispondrás de él.

Lo que `git` nos está diciendo es que hay dos secciones del fichero que no ha podido mezclar. Una de ellas alrededor de la línea 
7, en el bloque `import`, y otra que va desde después de esa línea hasta casi el final del fichero.

#### Resolviendo primera sección de conflictos 

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
`fatih/color` en aquellos módulos que lo utilizan. Para ello nos apoyaremos en `Sourcetree`
para ver el código que ha cambiado en la rama `GHC-14-muestra-salida-con-colores`. 

Si miras la confirmación de cambios `099ddf6`, verás que se han modificado tres partes del fichero:
- líneas 73-75 correspondientes al comando `authLoginCmd`
- líneas 102-108 correspondiente al comando `authStatusCmd`
- líneas 163-168 correspondientes al comando `prListCmd`

Eso significa que debemos editar los ficheros `commands/auth.go` y `commands/pr.go` y añadir la línea 

```text
  "github.com/fatih/color"
```

al bloque `import` de cada uno de ellos. Hagámoslo y con esto daremos por resueltos los conflictos de esta sección 
del fichero.

#### Resolviendo segunda sección de conflictos 

Veamos qué nos está diciendo `git`. Voy a copiar aquí una versión reducida de lo que vemos en `Visual Studio Code`:

```text
<<<<<<< HEAD
=======
var rootCmd = &cobra.Command{
	Use:   "github-client",
	Short: "A GitHub CLI client",
	Long:  `github-client is a command-line interface for interacting with GitHub's REST API`,
}
...
...
	rootCmd.PersistentFlags().StringP("repo", "r", "", "Repository in owner/repo format (e.g., golang/go)")
}

>>>>>>> GHC-14-muestra-salida-con-colores..
```

Es decir, en la rama `GHC-14-muestra-salida-con-colores` hay un montón de código, **que en la rama `HEAD` no está**, observa
el primer marcador:

```text
<<<<<<< HEAD
=======
```

De nuevo, mirando el código de ambas ramas observamos que ese código ya no está porque se extrajo a los ficheros
en la carpeta `commands/`.

Así que para resolver este conflicto debemos:
1. Mover el código que utiliza los colores de `main.go` a cada uno de los ficheros
1. Aceptar la versión del fichero `main.go` que está en `HEAD`

Empezamos por el comando `authLoginCmd`. Alrededor de la línea 77 de `main.go` encontrarás:

```go
		color.Green("✓ Authentication token saved successfully")
```

Copia esta línea, abre el fichero `commands/auth.go`, localiza el comando `cmdAuthLogin`, y alrededor de la línea 67, sustituye

```go
		fmt.Println("✓ Authentication token saved successfully")
```

por 

```go
		color.Green("✓ Authentication token saved successfully")
```


Vuelve al fichero `main.go`, localiza el comando `cmdAuthStatus`, alrededor de la línea 105 encontrarás este código:

```go
		// Display result
		message := fmt.Sprintf("✓ Authenticated as %s", user.Login)
		if user.Name != "" {
			message += fmt.Sprintf(" (%s)", user.Name)
		}
		color.Green(message)
```

Copia estas líneas, abre el fichero `commands/auth.go`, localiza el comando `cmdAuthstatus`, y alrededor de la línea 96
sustituye este código:

```go
		// Display result
		fmt.Printf("✓ Authenticated as %s", user.Login)
		if user.Name != "" {
			fmt.Printf(" (%s)", user.Name)
		}
		fmt.Println()
```

por

```go
		// Display result
		message := fmt.Sprintf("✓ Authenticated as %s", user.Login)
		if user.Name != "" {
			message += fmt.Sprintf(" (%s)", user.Name)
		}
		color.Green(message)
```

Vamos con el último fragmento de código. Vuelve al fichero `main.go`, localiza el comando `cmdPrList`, alrededor de la línea 
164 encontrarás este código:

```go
		for _, pr := range prs {
			color.Cyan("#%d", pr.Number)
			color.White(" - %s", pr.Title)
			fmt.Printf("  ")
			color.Yellow("Author: %s", pr.User.Login)
			fmt.Printf("\n  ")
			color.Black("URL: %s", pr.HTMLURL)
			fmt.Println()
		}
```

Copia estas líneas, abre el fichero `commands/auth.go`, localiza el comando `cmdPrList`, y alrededor de la línea 96
sustituye este código:

		for _, pr := range prs {
			fmt.Printf("#%d - %s\n", pr.Number, pr.Title)
			fmt.Printf("  Author: %s\n", pr.User.Login)
			fmt.Printf("  URL: %s\n\n", pr.HTMLURL)
		}

por

```go
		for _, pr := range prs {
			color.Cyan("#%d", pr.Number)
			color.White(" - %s", pr.Title)
			fmt.Printf("  ")
			color.Yellow("Author: %s", pr.User.Login)
			fmt.Printf("  ")
			color.Black("URL: %s", pr.HTMLURL)
			fmt.Println()
		}
```

Para terminar, volvemos al fichero `main.go` y borramos todas las líneas entre `<<<<<<< HEAD` y 
`>>>>>>> GHC-14-muestra-salida-con-colores`, o hacemos clic sobre la opción *Accept Current Change* del
menú contextual que nos da `Visual Studio Code`.

Vamos a comprobar que la aplicación funciona correctamente. Ejecutamos los comandos `auth status` y 
`pr list`, y deberíamos obtener la salida que esperamos con colores:

```powershell
> go run . auth status
✓ Authenticated as aalbagarcia (Alfonso Alba)

> go run . -r golang/go pr list
#77082
 - runtime/trace: fix documentation comment 
  Author: jjpinto
  URL: https://github.com/golang/go/pull/77082

#77081
 - cmd/dist: fix goroot typo in panic message
  Author: jjpinto
  URL: https://github.com/golang/go/pull/77081
...
...
...
```

#### Versión final de los ficheros
A continuación adjunto la versión final de los tres ficheros tras haber resuelto los conflictos:

`main.go`:

```go
package main

import (
	"fmt"
	"os"

	"aalbagarcia/github-client/commands"
)

// This GitHub client uses Go's standard library net/http for API calls.
// No external HTTP dependencies needed—the standard library handles everything.

func main() {
	if err := commands.RootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
```

`commands/auth.go`:

```go
package commands

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/fatih/color"
	"github.com/spf13/cobra"
)

// AuthCmd is the auth command group
var AuthCmd = &cobra.Command{
	Use:   "auth",
	Short: "Manage authentication",
	Long:  `Commands for authenticating with GitHub`,
}

// AuthLoginCmd handles GitHub authentication by saving a personal access token
var AuthLoginCmd = &cobra.Command{
	Use:   "login",
	Short: "Authenticate with GitHub",
	Long:  `Save a GitHub personal access token for API authentication`,
	RunE: func(cmd *cobra.Command, args []string) error {
		// Prompt user for token
		fmt.Print("Enter your GitHub personal access token: ")

		// Read from stdin
		reader := bufio.NewReader(os.Stdin)
		token, err := reader.ReadString('\n')
		if err != nil {
			return fmt.Errorf("failed to read token: %w", err)
		}

		// Remove trailing newline/spaces
		token = strings.TrimSpace(token)

		// Validate not empty
		if token == "" {
			return fmt.Errorf("token cannot be empty")
		}

		// Get home directory
		homeDir, err := os.UserHomeDir()
		if err != nil {
			return fmt.Errorf("failed to get home directory: %w", err)
		}

		// Build config directory path: ~/.config/github-client
		configDir := filepath.Join(homeDir, ".config", "github-client")

		// Create directory (0755 = rwxr-xr-x, readable by all, writable by owner)
		if err := os.MkdirAll(configDir, 0755); err != nil {
			return fmt.Errorf("failed to create config directory: %w", err)
		}

		// Build full path to token file
		tokenPath := filepath.Join(configDir, "token")

		// Write token to file (0600 = rw-------, only owner can read/write—security for sensitive data)
		if err := os.WriteFile(tokenPath, []byte(token), 0600); err != nil {
			return fmt.Errorf("failed to write token: %w", err)
		}

		fmt.Println("✓ Authentication token saved successfully")
		return nil
	},
}

// AuthStatusCmd checks if the user is authenticated with GitHub
var AuthStatusCmd = &cobra.Command{
	Use:   "status",
	Short: "Check authentication status",
	Long:  `Verify that your GitHub token is valid by calling the GitHub API`,
	RunE: func(cmd *cobra.Command, args []string) error {
		// Load and validate token using shared helpers
		token, err := LoadToken()
		if err != nil {
			return err
		}

		// Create client
		ghClient, err := NewGitHubClient(token)
		if err != nil {
			return err
		}

		// Get authenticated user
		user, err := ghClient.GetUser()
		if err != nil {
			return err
		}

		// Display result
		message := fmt.Sprintf("✓ Authenticated as %s", user.Login)
		if user.Name != "" {
			message += fmt.Sprintf(" (%s)", user.Name)
		}
		color.Green(message)

		return nil
	},
}
```

`commands/pr.go`:

```go
package commands

import (
	"fmt"
	"strings"

	"github.com/fatih/color"
	"github.com/spf13/cobra"
)

// PrCmd is the pull request command group
var PrCmd = &cobra.Command{
	Use:   "pr",
	Short: "Manage pull requests",
	Long:  `Commands for interacting with pull requests`,
}

// PrListCmd lists open pull requests for a repository
var PrListCmd = &cobra.Command{
	Use:   "list",
	Short: "List pull requests",
	Long:  `List open pull requests for a repository`,
	RunE: func(cmd *cobra.Command, args []string) error {
		// Load and validate token using shared helpers
		token, err := LoadToken()
		if err != nil {
			return err
		}

		// Create client
		ghClient, err := NewGitHubClient(token)
		if err != nil {
			return err
		}

		// Get repo from root command flag
		repo, err := cmd.Root().Flags().GetString("repo")
		if err != nil || repo == "" {
			return fmt.Errorf("-r flag is required (format: owner/repo)")
		}

		// Parse owner/repo
		parts := strings.Split(repo, "/")
		if len(parts) != 2 {
			return fmt.Errorf("invalid repo format: use owner/repo")
		}
		owner, repoName := parts[0], parts[1]

		// Get pull requests
		prs, err := ghClient.GetPRs(owner, repoName)
		if err != nil {
			return err
		}

		// Display pull requests
		if len(prs) == 0 {
			fmt.Println("No open pull requests found")
			return nil
		}

		for _, pr := range prs {
			color.Cyan("#%d", pr.Number)
			color.White(" - %s", pr.Title)
			fmt.Printf("  ")
			color.Yellow("Author: %s", pr.User.Login)
			fmt.Printf("  ")
			color.Black("URL: %s", pr.HTMLURL)
			fmt.Println()
		}

		return nil
	},
}
```

### Marcar conflictos como resueltos

En las secciones anteriores hemos modificado el código que `git` no ha sido capaz de mezclar. En nuestro
área de trabajo tenemos el código que queremos que compila y funciona correctamente. El siguiente paso es
decirle a `git` que ya hemos resuelto los conflictos. Si volvemos a `Sourcetree` veremos que han cambiado
algunas cosas:

![Merge GHC-14 paso 3 indicación de conflictos]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-3-indicacion-conflictos.png %})

- En primer lugar, a pesar de que hemos resuelto los conflictos a nivel de código, `git` todavía no sabe
  que eso ha pasado, y el fichero `main.go` sigue marcado como que tiene conflictos.
- Aparecen los ficheros `commands/auth.go` y `commands/pr.go` como modificados, lo que es esperable ya que 
  hemos necesitado cambiar el código para poder resolver los conflictos y que nuestra aplicación volviese a funcionar

El siguiente paso es decirle a `git` que el fichero `main.go` ya está resuelto. Podemos hacerlo de dos maneras:
- Subiendo el fichero al área de ensayo (haciendo clic en el icono con el `+` al lado del fichero)
- Utilizar el menú contextual de `Sourcetree`. Sobre  le fichero `main.go`, hacemos clic con el botón derecho,
  seleccionamos el submenú *Resolve Conflicts* y dentro de este *Mark Resolved*:

![Merge GHC-14 paso 3 marcar resuelto]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-3-marcar-resuelto.png %})

Tras hacerlo, el fichero `main.go` *¡¡desaparece del listado de ficheros modificados!!*

![Merge GHC-14 paso 3 marcado como resuelto]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-3-marcado-como-resuelto.png %})

¿Porqué ha ocurrido esto? porque al resolver el conflicto nos hemos quedado con la versión del fichero que está en la rama activa (`main`) y 
el fichero no ha cambiado. Por decirlo de otra forma, nos hemos quedado con la versión del fichero `main.go` que está en la rama `main`.


```powershell
> git status
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Changes to be committed:
        modified:   go.mod
        modified:   go.sum

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   main.go

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   commands/auth.go
        modified:   commands/pr.go
```

```powershell
> git add main.go
$ git status
On branch main
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
        modified:   go.mod
        modified:   go.sum

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   commands/auth.go
        modified:   commands/pr.go
```

### Confirmamos los cambios

Una vez hemos marcado los conflictos como resueltos, lo último que nos queda por hacer es confirmar los 
cambios. Recuerda que `git` se quedó a medias y no pudo confirmarlos porque no sabía como 
mezclar las instantáneas. Tras mezclarlas nosotros y verificar que la aplicación funciona, podemos terminar la integración. 

Antes de confirmar, debemos subir al área de ensayo las modificaciones de los ficheros en la carpeta `commands/`.
Hacemos clic sobre *Stage All* y después sobre el botón *Commit* del menú superior. En la parte 
inferior que al mensaje estándar que `git` utiliza para el *merge commit*, `git` ha 
añadido los ficheros en los que encontró conflictos:


![Merge GHC-14 paso 4 confirmar los cambios]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-4-commit.png %})

Como comentaremos en las diapositivas, la resolución de conflictos es el proceso más
delicado cuando trabajamos con `git`. En este ejemplo hemos visto cómo si no 
hubiésemos tenido cuidado, habríamos eliminado parte de una funcionalidad. Guardando
en el mansaje los ficheros en los que hubo conflictos, `git` de alguna manera nos 
está diciendo por dónde podemos empezar a mirar si en el futuro nos damos cuenta de que
ha habido un problema durante la resolución de conflictos.

Continuando con el taller, `Sourcetree` nos da la opción de modificar el mensaje por defecto que se genera. 
En este caso lo mantendremos como está, y haremos clic sobre el botón *commit* para terminar
de confirmar los cambios:


![Merge GHC-14 paso 5 cambios confirmados]({% link assets/img/talleres/go/taller-3-8-sourcetree-merge-ghc-14-paso-5-merge-terminado.png %})

Como en las integraciones anteriores, `git` hace la instantánea del código (que hemos
preparado nosotros resolviendo los conflictos), le añade los datos, guarda
los objetos de `git` en la carpeta `.git/objects` y mueve la rama activa (`main`).

```powershell
> git add .
> git status
On branch main
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
        modified:   commands/auth.go
        modified:   commands/pr.go
        modified:   go.mod
        modified:   go.sum
```

```powershell
> git commit
```
![Merge GHC-14 mensaje merge commit]({% link assets/img/talleres/go/taller-3-8-merge-ghc-14-consola-mensaje-merge-commit.png %})

```powershell
[main 9c868a0] Merge branch 'GHC-14-muestra-salida-con-colores'
 Date: Mon Feb 1 17:05:17 2055 +0100
```


## Utilizando la consola
