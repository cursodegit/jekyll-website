El código que hemos confirmado funciona cuando todo está en su sitio, pero no hace una gestión de errores correcta.
Por ejemplo, si eliminamos el fichero con el *token*, la aplicación falla con el error siguiente:

```powershell
> mv ~\.config\github-client\token ~\token
> go run . -r golang/go pr list 
Error: GitHub API error (status 401): {
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest",
  "status": "401"
}
```

en lugar de decirle al usuario que el fichero no existe. Vamos a cambiar el código para hacer una gestión de errores un poco
mejor.

Abrimos el fichero `main.go`, y sustituimos el comando `prListCmd` por el siguiente código:

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
			Number int    `json:"number"`
			Title  string `json:"title"`
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
		}

		return nil
	},
}

```

Si borramos el fichero con el *token* y ejecutamos el comando, veremos que la aplicación nos da ahora un error
más indicativo de lo que está pasando:


```powershell
> mv ~\.config\github-client\token ~\token
> go run . -r golang/go pr list
Error: not authenticated: run 'github-client auth login' first
```

Volvemos a poner el *token* en su sitio:

```powershell
> mv ~\token ~\.config\github-client\token
```

