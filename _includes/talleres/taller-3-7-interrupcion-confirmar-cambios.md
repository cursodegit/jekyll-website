Abrimos `Visual Studio Code` y sustituimos el código del comando `authStatusCmd` por lo siguiente:

```go
var authStatusCmd = &cobra.Command{
	Use:   "status",
	Short: "Check authentication status",
	Long:  `Verify that your GitHub token is valid by calling the GitHub API`,
	RunE: func(cmd *cobra.Command, args []string) error {
		// Try to load token from environment variable first
		token := os.Getenv("GHC_TOKEN")
		
		// If not in environment, try to load from file
		if token == "" {
			homeDir, err := os.UserHomeDir()
			if err != nil {
				return fmt.Errorf("failed to get home directory: %w", err)
			}

			tokenPath := filepath.Join(homeDir, ".config", "github-client", "token")
			tokenBytes, err := os.ReadFile(tokenPath)
			if err != nil {
				if os.IsNotExist(err) {
					return fmt.Errorf("not authenticated: set GHC_TOKEN environment variable or run 'github-client auth login' first")
				}
				return fmt.Errorf("failed to read token: %w", err)
			}

			token = strings.TrimSpace(string(tokenBytes))
		}

		// If still no token, raise an error
		if token == "" {
			return fmt.Errorf("no authentication token found: set GHC_TOKEN environment variable or run 'github-client auth login' first")
		}

		token = strings.TrimSpace(token)

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

```
Probamos la nueva versión del comando `auth status`. Si utilizamos un *token* incorrecto el comando fallará:

```powershell
> env:GHC_TOKEN='an-invalid-token'; go run . auth status             
Error: GitHub API error (status 401): {
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest",
  "status": "401"
}
Usage:
  github-client auth status [flags]

Flags:
  -h, --help   help for status

GitHub API error (status 401): {
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest",
  "status": "401"
}
exit status 1
```

Dejo como ejercicio para el lector el borrar el fichero `~/.config/github-client/token`, pasar el *token* usando 
la variable `GHC_TOKEN` y confirmar que el comando `auth status` usa el token correctamente.

