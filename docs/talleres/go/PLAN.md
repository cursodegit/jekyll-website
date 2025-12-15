# GitHub Client Workshop Plan

8 commits building a GitHub CLI client in Go, teaching best practices through small, teachable steps.

**Philosophy**: Interactive-first, minimal code per step; plain-text token file; simple fmt.Errorf; keep commands in main.go through commit 4; small copy/pasteable commits; simplicity over production robustness.

---

## Commit 1: Add net/http note to main.go

**Files modified**: `main.go`

**Why**: Document dependency choice before building features; teach that Go's stdlib is powerful.

**Code change**:
```go
// main.go
package main

import "fmt"

// This GitHub client uses Go's standard library net/http for API calls.
// No external HTTP dependencies needed—the standard library handles everything.
func main() {
  fmt.Println("Mi cliente de Github")
}
```

---

## Commit 2: Add Cobra and initialize root command

**Files modified**: `main.go`, `go.mod`

**Why**: Set up command structure so `github-client --help` works; Cobra auto-generates help.

**Terminal command**:
```powershell
go get github.com/spf13/cobra
```

**Code change in `main.go`**:
```go
// main.go
package main

import (
  "fmt"
  "os"

  "github.com/spf13/cobra"
)

// This GitHub client uses Go's standard library net/http for API calls.
// No external HTTP dependencies needed—the standard library handles everything.

var rootCmd = &cobra.Command{
  Use:   "github-client",
  Short: "A GitHub CLI client",
  Long:  `github-client is a command-line interface for interacting with GitHub's REST API`,
}

func main() {
  if err := rootCmd.Execute(); err != nil {
    fmt.Fprintln(os.Stderr, err)
    os.Exit(1)
  }
}
```

**Teaching points**:
- `cobra.Command` struct defines each command
- `Use` = command name, `Short` = one-line help, `Long` = detailed help
- `Execute()` parses arguments and routes to correct command
- Always check `err` and exit with non-zero code on failure (CLI best practice)

---

## Commit 3: Implement `auth login` command

**Files modified**: `main.go`

**Why**: Let users save their GitHub token; first interactive feature; teaches file I/O and prompts.

**Code change in `main.go`**:
```go
// main.go
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

**Teaching points**:
- `RunE` (error return) vs `Run` (no error); Cobra handles error display automatically
- `bufio.Reader` for user input from stdin
- `strings.TrimSpace()` removes `\n` from terminal input
- `os.UserHomeDir()` is cross-platform (Windows, Linux, macOS)
- `filepath.Join()` uses correct path separator for OS (vs hardcoded `/` or `\`)
- `os.MkdirAll()` creates parent dirs if needed; doesn't error if exists
- File permissions: `0755` = public read, `0600` = private (for secrets)
- `fmt.Errorf` with `%w` wraps error (Go 1.13+, enables error chains)
- `init()` runs before `main()`, registers commands
- Return `nil` on success, error on failure

---

## Commit 4: Add `auth status` command with HTTP call

**Files modified**: `main.go`

**Why**: First API call; teaches HTTP client setup, headers, JSON decoding; validates auth works.

**Code change in `main.go`** (add to file):
```go
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

// ... rootCmd, authCmd, authLoginCmd from before ...

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
```

**Teaching points**:
- `http.Client` with `Timeout` prevents hanging forever
- `http.NewRequestWithContext(ctx, ...)` enables cancellation
- `context.WithTimeout()` creates deadline; `defer cancel()` releases resources
- Headers critical for GitHub API: `Authorization: Bearer <token>` (note: not "Token"), `Accept`, `X-GitHub-Api-Version`
- `http.StatusOK` = 200 (use constants, not magic numbers)
- Always `defer resp.Body.Close()` (resource cleanup)
- `json.NewDecoder` streams JSON from body (more efficient than reading all then unmarshaling)
- Inline struct with `json:"field"` tags for simple one-off response parsing
- Conditional output: show name only if present

---

## Commit 5: Extract config helpers to `internal/config/config.go`

**Files created**: `internal/config/config.go`

**Files modified**: `main.go`

**Why**: Separate concerns; token read/write logic reusable and testable; teaches package organization.

**Code in `internal/config/config.go`** (new file):
```go
// internal/config/config.go
package config

import (
  "fmt"
  "os"
  "path/filepath"
  "strings"
)

// GetTokenPath returns the full path to the token file.
// Creates the config directory if it doesn't exist.
func GetTokenPath() (string, error) {
  homeDir, err := os.UserHomeDir()
  if err != nil {
    return "", fmt.Errorf("failed to get home directory: %w", err)
  }
  
  configDir := filepath.Join(homeDir, ".config", "github-client")
  
  // Ensure directory exists
  if err := os.MkdirAll(configDir, 0755); err != nil {
    return "", fmt.Errorf("failed to create config directory: %w", err)
  }
  
  return filepath.Join(configDir, "token"), nil
}

// SaveToken writes the GitHub token to disk.
func SaveToken(token string) error {
  if token == "" {
    return fmt.Errorf("token cannot be empty")
  }
  
  tokenPath, err := GetTokenPath()
  if err != nil {
    return err
  }
  
  // Write with 0600 permission (rw-------, only owner can read/write)
  if err := os.WriteFile(tokenPath, []byte(token), 0600); err != nil {
    return fmt.Errorf("failed to write token: %w", err)
  }
  
  return nil
}

// LoadToken reads the GitHub token from disk.
func LoadToken() (string, error) {
  tokenPath, err := GetTokenPath()
  if err != nil {
    return "", err
  }
  
  data, err := os.ReadFile(tokenPath)
  if err != nil {
    if os.IsNotExist(err) {
      return "", fmt.Errorf("not authenticated: run 'github-client auth login' first")
    }
    return "", fmt.Errorf("failed to read token: %w", err)
  }
  
  return strings.TrimSpace(string(data)), nil
}
```

**Code change in `main.go`** (refactor `auth login` and `auth status`):
```go
// main.go
package main

import (
  "bufio"
  "context"
  "encoding/json"
  "fmt"
  "io"
  "net/http"
  "os"
  "strings"
  "time"

  "github.com/spf13/cobra"
  
  "aalbagarcia/github-client/internal/config"
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
    fmt.Print("Enter your GitHub personal access token: ")
    
    reader := bufio.NewReader(os.Stdin)
    token, err := reader.ReadString('\n')
    if err != nil {
      return fmt.Errorf("failed to read token: %w", err)
    }
    
    token = strings.TrimSpace(token)
    
    if token == "" {
      return fmt.Errorf("token cannot be empty")
    }
    
    // Use config package to save
    if err := config.SaveToken(token); err != nil {
      return err
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
    // Use config package to load
    token, err := config.LoadToken()
    if err != nil {
      return err
    }
    
    // Create HTTP client with timeout
    client := &http.Client{
      Timeout: 10 * time.Second,
    }
    
    // Create context with timeout
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

**Teaching points**:
- `internal/` directory: Go convention; packages here can't be imported by external projects
- Package name matches directory name: `package config` in `internal/config/`
- Exported functions (capital first letter): `GetTokenPath`, `SaveToken`, `LoadToken`
- Import path: `aalbagarcia/github-client/internal/config` (matches `module` in `go.mod`)
- Refactoring: `main.go` now calls helpers instead of doing I/O directly
- Separation of concerns: config logic isolated, testable, reusable

---

## Commit 6: Create GitHub API client in `internal/github/client.go`

**Files created**: `internal/github/client.go`

**Files modified**: `main.go`

**Why**: Centralize HTTP client setup, auth headers, API calls; reuse across commands; teaches struct types and methods.

**Code in `internal/github/client.go`** (new file):
```go
// internal/github/client.go
package github

import (
  "context"
  "encoding/json"
  "fmt"
  "io"
  "net/http"
  "time"
)

// Client represents a GitHub API client.
type Client struct {
  httpClient *http.Client
  baseURL    string
  token      string
}

// NewClient creates a new GitHub API client with authentication.
func NewClient(token string) *Client {
  return &Client{
    httpClient: &http.Client{
      Timeout: 30 * time.Second,
    },
    baseURL: "https://api.github.com",
    token:   token,
  }
}

// Get performs a GET request to the GitHub API.
func (c *Client) Get(ctx context.Context, path string) (*http.Response, error) {
  url := c.baseURL + path
  
  req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
  if err != nil {
    return nil, fmt.Errorf("failed to create request: %w", err)
  }
  
  // Add authentication headers
  req.Header.Set("Authorization", "Bearer "+c.token)
  req.Header.Set("Accept", "application/vnd.github+json")
  req.Header.Set("X-GitHub-Api-Version", "2022-11-28")
  
  resp, err := c.httpClient.Do(req)
  if err != nil {
    return nil, fmt.Errorf("request failed: %w", err)
  }
  
  return resp, nil
}

// User represents a GitHub user.
type User struct {
  Login string `json:"login"`
  Name  string `json:"name"`
}

// GetAuthenticatedUser fetches the authenticated user's information.
func (c *Client) GetAuthenticatedUser(ctx context.Context) (*User, error) {
  resp, err := c.Get(ctx, "/user")
  if err != nil {
    return nil, err
  }
  defer resp.Body.Close()
  
  // Check response status
  if resp.StatusCode != http.StatusOK {
    body, _ := io.ReadAll(resp.Body)
    return nil, fmt.Errorf("GitHub API error (status %d): %s", resp.StatusCode, string(body))
  }
  
  // Decode JSON response
  var user User
  if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
    return nil, fmt.Errorf("failed to decode response: %w", err)
  }
  
  return &user, nil
}
```

**Code change in `main.go`** (refactor `auth status`):
```go
// main.go
package main

import (
  "bufio"
  "context"
  "fmt"
  "os"
  "strings"
  "time"

  "github.com/spf13/cobra"
  
  "aalbagarcia/github-client/internal/config"
  "aalbagarcia/github-client/internal/github"
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
    fmt.Print("Enter your GitHub personal access token: ")
    
    reader := bufio.NewReader(os.Stdin)
    token, err := reader.ReadString('\n')
    if err != nil {
      return fmt.Errorf("failed to read token: %w", err)
    }
    
    token = strings.TrimSpace(token)
    
    if token == "" {
      return fmt.Errorf("token cannot be empty")
    }
    
    if err := config.SaveToken(token); err != nil {
      return err
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
    // Load token
    token, err := config.LoadToken()
    if err != nil {
      return err
    }
    
    // Create GitHub client
    client := github.NewClient(token)
    
    // Create context with timeout
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    
    // Call API
    user, err := client.GetAuthenticatedUser(ctx)
    if err != nil {
      return err
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

**Teaching points**:
- Struct with unexported (lowercase) fields: encapsulation
- Constructor pattern: `NewClient()` initializes and returns a `*Client`
- Method receiver `(c *Client)`: function belongs to `Client`, can access fields
- Pointer receiver `*Client` (not `Client`) is convention for mutable operations
- Exported types/methods (capital letter) are part of package API
- `context.Context` parameter enables cancellation and timeouts
- Methods can call other methods: `c.Get()` called from `GetAuthenticatedUser()`

---

## Commit 7: Add `pr list` command with real API call

**Files created**: `internal/pr/list.go`

**Files modified**: `main.go`

**Why**: Fetch real pull request data from GitHub; teaches more complex API calls, URL building, JSON arrays, flag handling.

**Code in `internal/pr/list.go`** (new file):
```go
// internal/pr/list.go
package pr

import (
  "context"
  "encoding/json"
  "fmt"
  "io"
  "net/http"
  
  "aalbagarcia/github-client/internal/github"
)

// PullRequest represents a GitHub pull request.
type PullRequest struct {
  Number  int    `json:"number"`
  Title   string `json:"title"`
  State   string `json:"state"`
  HTMLURL string `json:"html_url"`
  User    struct {
    Login string `json:"login"`
  } `json:"user"`
}

// List fetches pull requests from a repository.
func List(ctx context.Context, client *github.Client, owner, repo, state string) ([]PullRequest, error) {
  // Build API path with query parameter
  path := fmt.Sprintf("/repos/%s/%s/pulls?state=%s", owner, repo, state)
  
  // Make API request
  resp, err := client.Get(ctx, path)
  if err != nil {
    return nil, err
  }
  defer resp.Body.Close()
  
  // Check response status
  if resp.StatusCode != http.StatusOK {
    body, _ := io.ReadAll(resp.Body)
    return nil, fmt.Errorf("GitHub API error (status %d): %s", resp.StatusCode, string(body))
  }
  
  // Decode JSON array into slice
  var prs []PullRequest
  if err := json.NewDecoder(resp.Body).Decode(&prs); err != nil {
    return nil, fmt.Errorf("failed to decode response: %w", err)
  }
  
  return prs, nil
}
```

**Code change in `main.go`** (add PR commands):
```go
// main.go
package main

import (
  "bufio"
  "context"
  "fmt"
  "os"
  "strings"
  "time"

  "github.com/spf13/cobra"
  
  "aalbagarcia/github-client/internal/config"
  "aalbagarcia/github-client/internal/github"
  "aalbagarcia/github-client/internal/pr"
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
    fmt.Print("Enter your GitHub personal access token: ")
    
    reader := bufio.NewReader(os.Stdin)
    token, err := reader.ReadString('\n')
    if err != nil {
      return fmt.Errorf("failed to read token: %w", err)
    }
    
    token = strings.TrimSpace(token)
    
    if token == "" {
      return fmt.Errorf("token cannot be empty")
    }
    
    if err := config.SaveToken(token); err != nil {
      return err
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
    token, err := config.LoadToken()
    if err != nil {
      return err
    }
    
    client := github.NewClient(token)
    
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    
    user, err := client.GetAuthenticatedUser(ctx)
    if err != nil {
      return err
    }
    
    fmt.Printf("✓ Authenticated as %s", user.Login)
    if user.Name != "" {
      fmt.Printf(" (%s)", user.Name)
    }
    fmt.Println()
    
    return nil
  },
}

var prCmd = &cobra.Command{
  Use:   "pr",
  Short: "Manage pull requests",
  Long:  `Commands for working with GitHub pull requests`,
}

// Flags for pr list command
var (
  prListOwner string
  prListRepo  string
  prListState string
)

var prListCmd = &cobra.Command{
  Use:   "list",
  Short: "List pull requests",
  Long:  `List pull requests for a repository`,
  Example: `  github-client pr list --owner golang --repo go
  github-client pr list --owner microsoft --repo vscode --state closed`,
  RunE: func(cmd *cobra.Command, args []string) error {
    // Validate required flags
    if prListOwner == "" || prListRepo == "" {
      return fmt.Errorf("--owner and --repo are required")
    }
    
    // Load token and create client
    token, err := config.LoadToken()
    if err != nil {
      return err
    }
    
    client := github.NewClient(token)
    
    // Create context with timeout
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    
    // Fetch pull requests
    prs, err := pr.List(ctx, client, prListOwner, prListRepo, prListState)
    if err != nil {
      return err
    }
    
    // Display results
    if len(prs) == 0 {
      fmt.Println("No pull requests found")
      return nil
    }
    
    fmt.Printf("Found %d pull request(s):\n\n", len(prs))
    for _, p := range prs {
      fmt.Printf("#%-4d %s\n", p.Number, p.Title)
      fmt.Printf("      State: %s | Author: %s\n", p.State, p.User.Login)
      fmt.Printf("      %s\n\n", p.HTMLURL)
    }
    
    return nil
  },
}

func init() {
  // Auth commands
  rootCmd.AddCommand(authCmd)
  authCmd.AddCommand(authLoginCmd)
  authCmd.AddCommand(authStatusCmd)
  
  // PR commands
  rootCmd.AddCommand(prCmd)
  prCmd.AddCommand(prListCmd)
  
  // PR list flags
  prListCmd.Flags().StringVar(&prListOwner, "owner", "", "Repository owner (required)")
  prListCmd.Flags().StringVar(&prListRepo, "repo", "", "Repository name (required)")
  prListCmd.Flags().StringVar(&prListState, "state", "open", "Filter by state: open, closed, all")
}

func main() {
  if err := rootCmd.Execute(); err != nil {
    fmt.Fprintln(os.Stderr, err)
    os.Exit(1)
  }
}
```

**Teaching points**:
- Nested struct for user in JSON: `User struct { Login string } json:"user"`
- URL building with `fmt.Sprintf` for query strings
- Slice of structs: `[]PullRequest` to decode JSON arrays
- Flag variables declared as package-level vars (available to command functions)
- `StringVar` binds flag to variable; default value is second arg
- Flag validation: check required flags before using
- Formatted output with `fmt.Printf`: `%-4d` for left-aligned integer (padding)
- Loop through slice: `for _, p := range prs`

---

## Commit 8: Add terminal colors to `pr list` output

**Files modified**: `main.go`

**Why**: Visual feedback, professional CLI feel; teaches ANSI escape codes (simple approach without external deps).

**Code change in `main.go`** (add color helpers at top, refactor `prListCmd`):
```go
// main.go
package main

import (
  "bufio"
  "context"
  "fmt"
  "os"
  "strings"
  "time"

  "github.com/spf13/cobra"
  
  "aalbagarcia/github-client/internal/config"
  "aalbagarcia/github-client/internal/github"
  "aalbagarcia/github-client/internal/pr"
)

// This GitHub client uses Go's standard library net/http for API calls.
// No external HTTP dependencies needed—the standard library handles everything.

// ANSI color codes for terminal output
const (
  colorReset   = "\033[0m"
  colorGreen   = "\033[32m"
  colorCyan    = "\033[36m"
  colorRed     = "\033[31m"
)

// colorize wraps text in ANSI color codes
func colorize(text, color string) string {
  return color + text + colorReset
}

// ... rootCmd, authCmd, authLoginCmd, authStatusCmd from before ...

var prCmd = &cobra.Command{
  Use:   "pr",
  Short: "Manage pull requests",
  Long:  `Commands for working with GitHub pull requests`,
}

// Flags for pr list command
var (
  prListOwner string
  prListRepo  string
  prListState string
)

var prListCmd = &cobra.Command{
  Use:   "list",
  Short: "List pull requests",
  Long:  `List pull requests for a repository`,
  Example: `  github-client pr list --owner golang --repo go
  github-client pr list --owner microsoft --repo vscode --state closed`,
  RunE: func(cmd *cobra.Command, args []string) error {
    // Validate required flags
    if prListOwner == "" || prListRepo == "" {
      return fmt.Errorf("--owner and --repo are required")
    }
    
    // Load token and create client
    token, err := config.LoadToken()
    if err != nil {
      return err
    }
    
    client := github.NewClient(token)
    
    // Create context with timeout
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    
    // Fetch pull requests
    prs, err := pr.List(ctx, client, prListOwner, prListRepo, prListState)
    if err != nil {
      return err
    }
    
    // Display results with colors
    if len(prs) == 0 {
      fmt.Println("No pull requests found")
      return nil
    }
    
    // Header in green
    header := fmt.Sprintf("Found %d pull request(s):", len(prs))
    fmt.Println(colorize(header, colorGreen))
    fmt.Println()
    
    // List items with colors
    for _, p := range prs {
      // PR number and title in cyan
      fmt.Printf("%s#%-4d %s%s\n", colorCyan, p.Number, p.Title, colorReset)
      fmt.Printf("      State: %s | Author: %s\n", p.State, p.User.Login)
      fmt.Printf("      %s\n\n", p.HTMLURL)
    }
    
    return nil
  },
}

func init() {
  // Auth commands
  rootCmd.AddCommand(authCmd)
  authCmd.AddCommand(authLoginCmd)
  authCmd.AddCommand(authStatusCmd)
  
  // PR commands
  rootCmd.AddCommand(prCmd)
  prCmd.AddCommand(prListCmd)
  
  // PR list flags
  prListCmd.Flags().StringVar(&prListOwner, "owner", "", "Repository owner (required)")
  prListCmd.Flags().StringVar(&prListRepo, "repo", "", "Repository name (required)")
  prListCmd.Flags().StringVar(&prListState, "state", "open", "Filter by state: open, closed, all")
}

func main() {
  if err := rootCmd.Execute(); err != nil {
    fmt.Fprintln(os.Stderr, err)
    os.Exit(1)
  }
}
```

**Teaching points**:
- ANSI escape codes: `\033[32m` = green, `\033[36m` = cyan, `\033[31m` = red, `\033[0m` = reset
- Helper function `colorize(text, color)` wraps text for readability
- Constants for color codes at package level (reusable)
- In `fmt.Printf`, can include color codes directly or use helper
- Colors make output more scannable; green for success, cyan for highlights
- This is the "poor man's" approach—professional apps use packages like `fatih/color`, but ANSI codes teach string manipulation

---

## Final Architecture

After all 8 commits:

```
github-client/
├── go.mod
├── go.sum
├── main.go                    # CLI commands, color helpers
├── .gitignore
├── PLAN.md                    # This file
└── internal/
    ├── config/
    │   └── config.go          # Token read/write
    ├── github/
    │   └── client.go          # HTTP client with auth
    └── pr/
        └── list.go            # List PRs operation
```

## Key Lessons by Commit

1. **Commit 1**: Go stdlib is comprehensive; document choices
2. **Commit 2**: Cobra provides CLI structure and auto-help
3. **Commit 3**: File I/O, cross-platform paths, secure permissions
4. **Commit 4**: HTTP client setup, headers, JSON parsing, context/timeouts
5. **Commit 5**: Package organization, separation of concerns, `internal/` convention
6. **Commit 6**: Structs, methods, pointers, encapsulation, constructor pattern
7. **Commit 7**: Nested structs in JSON, slices, flags, string formatting
8. **Commit 8**: ANSI codes, helper functions, terminal UX

Each commit introduces **one concept** and builds on previous work, making it ideal for a workshop where students commit frequently and understand each step.
