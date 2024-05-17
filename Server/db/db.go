package db

import (
	"database/sql"

	"github.com/allefts/muveez_server/config"
	"github.com/charmbracelet/log"

	_ "github.com/mattn/go-sqlite3"
)

type SQLiteStorage struct {
	db *sql.DB
}

func NewSQLiteStorage(cfg config.Config) *SQLiteStorage {
	db, err := sql.Open("sqlite3", cfg.DBName)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	log.Info("Connected to SQLite")

	return &SQLiteStorage{db: db}
}

func (s *SQLiteStorage) Init() (*sql.DB, error) {
	_, err := s.db.Exec(
		`CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email VARCHAR(255) NOT NULL UNIQUE,
			name VARCHAR(255) NOT NULL,
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
		`,
	)

	if err != nil {
		log.Fatal(err)
	}

	return s.db, nil
}
