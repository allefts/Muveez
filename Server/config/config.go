package config

import (
	"os"

	"github.com/go-sql-driver/mysql"
)

type Config struct {
	DBCfg              mysql.Config
	DBName             string
	DBSecret           string
	GoogleClientId     string
	GoogleClientSecret string
	SupaSecret         string
}

func InitConfig() *Config {
	return &Config{
		DBCfg: mysql.Config{
			User:      getEnv("DB_USER", "root"),
			Passwd:    getEnv("DB_PASS", "password"),
			DBName:    getEnv("DB_NAME", "muveez"),
			Net:       "tcp",
			Addr:      "127.0.0.1:3306",
			ParseTime: true,
		},
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
