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


