Una vez tengamos la rama creada, modificamos el fichero `main.go` y añadimos el comando `pr list`. 
**¡Asegurate de que la rama activa es `GH10-comando-pr-list`!**. Copia el código del comando `prListCmd`
y añádelo al fichero `main.go` **debajo de la definición de `authStatusCmd`**:

```go

var prCmd = &cobra.Command{
	Use:   "pr",
	Short: "Manage pull requests",
	Long:  `Commands for interacting with pull requests`,
}

var prListCmd = &cobra.Command{
	Use:   "list",
	Short: "List pull requests",
	Long:  `List open pull requests for a repository`,
	RunE: func(cmd *cobra.Command, args []string) error {
		// Load token from file
		homeDir, _ := os.UserHomeDir()

		tokenPath := filepath.Join(homeDir, ".config", "github-client", "token")
		tokenBytes, _ := os.ReadFile(tokenPath)

		token := strings.TrimSpace(string(tokenBytes))

		// Get repo from root command flag
		repo, _ := cmd.Root().Flags().GetString("repo")

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
		req, _ := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)

		req.Header.Set("Authorization", "Bearer "+token)
		req.Header.Set("Accept", "application/vnd.github+json")
		req.Header.Set("X-GitHub-Api-Version", "2022-11-28")

		// Execute request
		resp, _ := client.Do(req)

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

		json.NewDecoder(resp.Body).Decode(&prs)

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

Además, sustituye la función `init()` por el siguiente código:

```go
func init() {
	// Build command hierarchy
	rootCmd.AddCommand(authCmd)
	authCmd.AddCommand(authLoginCmd)
	authCmd.AddCommand(authStatusCmd)

	rootCmd.AddCommand(prCmd)
	prCmd.AddCommand(prListCmd)

	// Add flags
	rootCmd.PersistentFlags().StringP("repo", "r", "", "Repository in owner/repo format (e.g., golang/go)")
}
```

Comprobamos que todo funciona ejecutando el comando:

```powershell
> go run . -r golang/go pr list
#77051 - runtime: support c-archive and c-shared on freebsd/arm and freebsd/arm64
#77048 - archive/tar: reset Size to 0 for header-only types in WriteHeader
#77042 - all: replace calls to errors.As with errors.AsType
#77014 - internal/trace/version: change message to lowercase idiomatic go
#77013 - internal/profile: fix error message casing for function ID not found
...
...
```

Una vez comprobamos que el código funciona, y antes de pasar al siguiente paso (añadir la gestión de errores), vamos a 
confirmar los cambios. Una buena práctica de `git` es realizar *commits* atómicos, y cada uno de los tres 
cambios que tenemos que hacer se pueden considerar atómicos (primera implementación, refactorización, añadir información). 
Esta decisión es arbitraria y algunos podéis considerar que los tres cambios se podrían incluir en una única confirmación 
ya que están relacionados. Dependiendo del contexto en el que se tenga que tomar esta decisión, estoy de acuerdo con ella. 
Sin embargo, en este contexto (en el contexto de este taller), tiene sentido 
hacer tres *commits* y así es como vamos a proceder. Con este párrafo pretendo ilustrar que las decisiones y buenas 
prácticas de `git` son muchas veces relativas y, al final, debemos usar el sentido comnún y aquello que 
le funciona al equipo o proyecto en el que estemos.
