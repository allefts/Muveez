package config

import (
	"os"
)

type Config struct {
	DBName             string
	DBSecret           string
	GoogleClientId     string
	GoogleClientSecret string
	SupaSecret         string
}

func InitConfig() *Config {
	return &Config{
		DBName:             getEnv("DB_NAME", "Muveez"),
		DBSecret:           getEnv("DB_SECRET", "Secret"),
		GoogleClientId:     getEnv("GOOGLE_CLIENT_ID", "google"),
		GoogleClientSecret: getEnv("GOOGLE_CLIENT_SECRET", "google"),
		SupaSecret:         getEnv("SUPA_SECRET", "supasecret"),
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return fallback

}
