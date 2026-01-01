Una vez tenemos el comando `auth login` funcionando, y nuestro token almacenado en nuestra carpeta raiz, 
vamos a añadir el comando `auth status`. Este comando hace uso del token para comprobar
que es válido.

Editamos el fichero `main.go` y añadimos el siguiente código:

```go
package main

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

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

var authStatusCmd = &cobra.Command{
	Use:   "status",
	Short: "Check authentication status",
	Long:  `Verify that your GitHub token is valid by calling the GitHub API`,
	RunE: func(cmd *cobra.Command, args []string) error {
		// Load token from file
		homeDir, err := os.UserHomeDir()
		if err != nil {
			return fmt.Errorf("failed to get home directory: %w", err)
		}

		tokenPath := filepath.Join(homeDir, ".config", "github-client", "token")
		tokenBytes, err := os.ReadFile(tokenPath)
		if err != nil {
			if os.IsNotExist(err) {
				return fmt.Errorf("not authenticated: run 'github-client auth login' first")
			}
			return fmt.Errorf("failed to read token: %w", err)
		}

		token := strings.TrimSpace(string(tokenBytes))

		// Create HTTP client with timeout
		client := &http.Client{
			Timeout: 10 * time.Second,
		}

		// Create context with timeout (for cancellation)
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		// Build request to GitHub API
		req, err := http.NewRequestWithContext(ctx, http.MethodGet, "https://api.github.com/user", nil)
		if err != nil {
			return fmt.Errorf("failed to create request: %w", err)
		}

		// Add authentication headers
		req.Header.Set("Authorization", "Bearer "+token)
		req.Header.Set("Accept", "application/vnd.github+json")
		req.Header.Set("X-GitHub-Api-Version", "2022-11-28")

		// Execute request
		resp, err := client.Do(req)
		if err != nil {
			return fmt.Errorf("request failed: %w", err)
		}
		defer resp.Body.Close()

		// Check response status
		if resp.StatusCode != http.StatusOK {
			body, _ := io.ReadAll(resp.Body)
			return fmt.Errorf("GitHub API error (status %d): %s", resp.StatusCode, string(body))
		}

		// Decode JSON response
		var user struct {
			Login string `json:"login"`
			Name  string `json:"name"`
		}

		if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
			return fmt.Errorf("failed to decode response: %w", err)
		}

		// Display result
		fmt.Printf("✓ Authenticated as %s", user.Login)
		if user.Name != "" {
			fmt.Printf(" (%s)", user.Name)
		}
		fmt.Println()

		return nil
	},
}

func init() {
	// Build command hierarchy
	rootCmd.AddCommand(authCmd)
	authCmd.AddCommand(authLoginCmd)
	authCmd.AddCommand(authStatusCmd)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

```


Tras guardar los cambios, ejecutamos el comando:

```powershell
> go run . auth status
✓ Authenticated as aalbagarcia (Alfonso Alba)
```

Si todo ha funcionado correctamente, la salida del comando mostrará tu nombre de usuario y tu nombre según los tengas
configurados en github.
