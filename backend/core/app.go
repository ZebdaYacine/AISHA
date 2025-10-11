package core

import "backend/pkg"

var appConfig pkg.AppConfig

// InitAppConfig stores the resolved configuration for access in helper functions.
func InitAppConfig(cfg pkg.AppConfig) {
	appConfig = cfg
}

// AppConfig returns the bootstrapped configuration.
func AppConfig() pkg.AppConfig {
	return appConfig
}
