package pkg

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type AppConfig struct {
	ServerAddress      string
	ServerPort         string
	SecretKey          string
	DatabaseURL        string
	RedisAddr          string
	RedisPassword      string
	RedisDB            int
	GoogleClientID     string
	GoogleClientSecret string
	GoogleRedirectURL  string
	OAuthStateTTL      time.Duration
	SessionTokenTTL    time.Duration
	RefreshTokenTTL    time.Duration
	AllowedOrigins     []string
	Environment        string
}

func LoadConfig(envPaths ...string) (AppConfig, error) {
	seen := make(map[string]struct{})
	envLoaded := false

	for _, path := range envPaths {
		loaded, err := tryLoadEnv(path, seen)
		if err != nil {
			return AppConfig{}, err
		}
		if loaded {
			envLoaded = true
		}
	}

	if !envLoaded {
		loaded, err := loadEnvFromWorkingDir(seen)
		if err != nil {
			return AppConfig{}, err
		}
		if loaded {
			envLoaded = true
		}
	}

	if !envLoaded {
		fmt.Println("No .env file found, relying on environment variables")
	}

	cfg := AppConfig{
		ServerAddress:      getEnv("SERVER_ADDRESS", "0.0.0.0"),
		ServerPort:         getEnv("SERVER_PORT", "8080"),
		SecretKey:          getEnv("SECRET_KEY", ""),
		DatabaseURL:        getEnv("DATABASE_URL", ""),
		RedisAddr:          getEnv("REDIS_ADDR", "127.0.0.1:6379"),
		RedisPassword:      getEnv("REDIS_PASSWORD", ""),
		GoogleClientID:     getEnv("GOOGLE_CLIENT_ID", ""),
		GoogleClientSecret: getEnv("GOOGLE_CLIENT_SECRET", ""),
		GoogleRedirectURL:  getEnv("GOOGLE_REDIRECT_URL", "http://localhost:8080/auth/google/callback"),
		Environment:        getEnv("APP_ENV", "development"),
	}

	if cfg.SecretKey == "" {
		return AppConfig{}, errors.New("SECRET_KEY is required")
	}
	if cfg.DatabaseURL == "" {
		return AppConfig{}, errors.New("DATABASE_URL (MySQL DSN) is required")
	}
	if cfg.GoogleClientID == "" || cfg.GoogleClientSecret == "" {
		return AppConfig{}, errors.New("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required")
	}

	redisDB, err := strconv.Atoi(getEnv("REDIS_DB", "0"))
	if err != nil {
		return AppConfig{}, fmt.Errorf("invalid REDIS_DB: %w", err)
	}
	cfg.RedisDB = redisDB

	stateTTLMinutes, err := strconv.Atoi(getEnv("OAUTH_STATE_TTL_MINUTES", "10"))
	if err != nil {
		return AppConfig{}, fmt.Errorf("invalid OAUTH_STATE_TTL_MINUTES: %w", err)
	}
	cfg.OAuthStateTTL = time.Duration(stateTTLMinutes) * time.Minute

	sessionTTLMinutes, err := strconv.Atoi(getEnv("SESSION_TOKEN_TTL_MINUTES", "30"))
	if err != nil {
		return AppConfig{}, fmt.Errorf("invalid SESSION_TOKEN_TTL_MINUTES: %w", err)
	}
	cfg.SessionTokenTTL = time.Duration(sessionTTLMinutes) * time.Minute

	refreshTTLMinutes, err := strconv.Atoi(getEnv("REFRESH_TOKEN_TTL_MINUTES", "10080"))
	if err != nil {
		return AppConfig{}, fmt.Errorf("invalid REFRESH_TOKEN_TTL_MINUTES: %w", err)
	}
	cfg.RefreshTokenTTL = time.Duration(refreshTTLMinutes) * time.Minute

	origins := getEnv("ALLOWED_ORIGINS", "*")
	if origins == "" {
		cfg.AllowedOrigins = []string{"*"}
	} else {
		cfg.AllowedOrigins = splitAndTrim(origins)
	}

	return cfg, nil
}

func loadEnvFromWorkingDir(seen map[string]struct{}) (bool, error) {
	wd, err := os.Getwd()
	if err != nil {
		return false, nil
	}

	dir := wd
	for {
		loaded, err := tryLoadEnv(filepath.Join(dir, ".env"), seen)
		if err != nil {
			return false, err
		}
		if loaded {
			return true, nil
		}

		parent := filepath.Dir(dir)
		if parent == dir {
			break
		}
		dir = parent
	}

	return false, nil
}

func tryLoadEnv(path string, seen map[string]struct{}) (bool, error) {
	if path == "" {
		return false, nil
	}

	abs, err := filepath.Abs(path)
	if err != nil {
		return false, fmt.Errorf("failed to resolve env file path %q: %w", path, err)
	}

	if _, exists := seen[abs]; exists {
		return false, nil
	}
	seen[abs] = struct{}{}

	info, err := os.Stat(abs)
	if err != nil {
		if os.IsNotExist(err) {
			return false, nil
		}
		return false, fmt.Errorf("failed to stat env file %q: %w", abs, err)
	}
	if info.IsDir() {
		return false, fmt.Errorf("env path %q is a directory", abs)
	}

	if err := godotenv.Load(abs); err != nil {
		return false, fmt.Errorf("failed to load env file %q: %w", abs, err)
	}

	return true, nil
}

func (cfg AppConfig) ListenAddr() string {
	return fmt.Sprintf("%s:%s", cfg.ServerAddress, cfg.ServerPort)
}

func getEnv(key, fallback string) string {
	val := strings.TrimSpace(os.Getenv(key))
	if val == "" {
		return fallback
	}
	return val
}

func splitAndTrim(input string) []string {
	parts := strings.Split(input, ",")
	values := make([]string, 0, len(parts))
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part != "" {
			values = append(values, part)
		}
	}
	if len(values) == 0 {
		return []string{"*"}
	}
	return values
}
