Nos aseguramos de que la rama activa es `GHC-10-comando-pr-list` antes de hacer los cambios.
Mirando la [Documentación de la API de GitHub](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28), 
podemos ver la respuesta `JSON` con toda la información que nos devuelve la llamada. Modificamos el fichero `main.go`
e incluimos el autor del *Pull Request* y la URL del mismo: 

```go
var prListCmd = &cobra.Command{
	Use:   "list",
	Short: "List pull requests",
	Long:  `List open pull requests for a repository`,
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

Ejecutamos la solución y verificamos que se muestra el enlace:

```powershell
$  go run . -r golang/go pr list
#77061 - archive/zip: set ZIP64 version in Local File Header for large entries
  Author: xuri
  URL: https://github.com/golang/go/pull/77061

#77051 - runtime: support c-archive and c-shared on freebsd/arm and freebsd/arm64
  Author: rdnn
  URL: https://github.com/golang/go/pull/77051

#77048 - archive/tar: reset Size to 0 for header-only types in WriteHeader
  Author: heathdutton
  URL: https://github.com/golang/go/pull/77048

#77042 - all: replace calls to errors.As with errors.AsType
  Author: jub0bs
  URL: https://github.com/golang/go/pull/77042
...
...

```
