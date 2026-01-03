Cuando trabajamos en `GHC-11` nuestra compañera nos pidió que la aplicación pudiese
leer el *token* de una variable de entorno. Podemos seguir dos caminos:
1. Implementarlo como parte de la tarea `GHC-10`
1. Terminar y desplegar `GHC-10` y crear una nueva tarea en Jira para hacer ese cambio

En este taller seguiremos el primer camino e implementaremos el cambio como parte de `GHC-10`. 

Sustituimos el código del comando `prListCmd` en el fichero `main.go` por el siguiente:

```go

var prListCmd = &cobra.Command{
	Use:   "list",
	Short: "List pull requests",
	Long:  `List open pull requests for a repository`,
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

		// Create HTTP client
		client := &http.Client{
			Timeout: 10 * time.Second,
		}

		// Build request
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		url := fmt.Sprintf("https://api.github.com/repos/%s/%s/pulls?state=open", owner, repoName)
		req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
		if err != nil {
			return fmt.Errorf("failed to create request: %w", err)
		}

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

		// Decode response
		var prs []struct {
			Number  int    `json:"number"`
			Title   string `json:"title"`
			HTMLURL string `json:"html_url"`
			User    struct {
				Login string `json:"login"`
			} `json:"user"`
		}

		if err := json.NewDecoder(resp.Body).Decode(&prs); err != nil {
			return fmt.Errorf("failed to decode response: %w", err)
		}

		// Display pull requests
		if len(prs) == 0 {
			fmt.Println("No open pull requests found")
			return nil
		}

		for _, pr := range prs {
			fmt.Printf("#%d - %s\n", pr.Number, pr.Title)
			fmt.Printf("  Author: %s\n", pr.User.Login)
			fmt.Printf("  URL: %s\n\n", pr.HTMLURL)
		}

		return nil
	},
}
```

Ejecutamos la aplicación en local pasando un *token* inválido para verificar que funciona:

```powershell
> GHC_TOKEN='invalid' go run . -r golang/go  pr list
Error: GitHub API error (status 401): {
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest",
  "status": "401"
}
Usage:
  github-client pr list [flags]

Flags:
  -h, --help   help for list

Global Flags:
  -r, --repo string   Repository in owner/repo format (e.g., golang/go)

GitHub API error (status 401): {
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest",
  "status": "401"
}
exit status 1

```

