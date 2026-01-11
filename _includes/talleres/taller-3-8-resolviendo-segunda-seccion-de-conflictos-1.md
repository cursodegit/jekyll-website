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


