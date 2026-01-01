Creamos el comando `auth login`. Este comando pide al usuario que introduzca so *token* y lo guarda
en el fichero `$HOME/.config/github-client/token`. Abrimos `Visual Studio Code` y sustituimos el contenido del fichero
`main.go` por lo siguiente:

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

// This GitHub client uses Go's standard library net/http for API calls.
// No external HTTP dependencies needed—the standard library handles everything.

var rootCmd = &cobra.Command{
	Use:   "github-client",
	Short: "A GitHub CLI client",
	Long:  `github-client is a command-line interface for interacting with GitHub's REST API`,
}

var authCmd = &cobra.Command{
	Use:   "auth",
	Short: "Manage authentication",
	Long:  `Commands for authenticating with GitHub`,
}

var authLoginCmd = &cobra.Command{
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

func init() {
	// Build command hierarchy: github-client auth login
	rootCmd.AddCommand(authCmd)
	authCmd.AddCommand(authLoginCmd)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

```
Guardamos el fichero y verificamos que el comando funciona correctamente. Para ello, abrimos la consola y lo ejecutamos:

```powershell
> go run . auth login
Enter your GitHub personal access token: github_pat_1..............0
✓ Authentication token saved successfully
```

Podemos verificar que se ha guardado el token correctamente mirando el contenido del fichero `$HOME/.config/github-client/token`

```powershell
> Get-Content $HOME/.config/github-client/token
github_pat_1..............0
```

o usando el comando `cat`:

```powershell
> cat $HOME/.config/github-client/token
github_pat_1..............0
```

