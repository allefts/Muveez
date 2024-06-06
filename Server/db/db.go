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

func NewSQLiteStorage(cfg *config.Config) *SQLiteStorage {
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

	if err := s.createUsersTable(); err != nil {
		return nil, err
	}

	if err := s.createMoviesTable(); err != nil {
		return nil, err
	}

	if err := s.createListsTable(); err != nil {
		return nil, err
	}

	if err := s.createListMoviesTable(); err != nil {
		return nil, err
	}

	return s.db, nil
}

// USERS
func (s *SQLiteStorage) createUsersTable() error {
	_, err := s.db.Exec(
		`CREATE TABLE IF NOT EXISTS users (
			user_id INTEGER PRIMARY KEY AUTOINCREMENT,
			google_id VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL UNIQUE,
			username VARCHAR(255) UNIQUE,
			name VARCHAR(255) NOT NULL,
			avatar_url VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
		`,
	)

	return err
}

// MOVIES
func (s *SQLiteStorage) createMoviesTable() error {
	_, err := s.db.Exec(
		`CREATE TABLE IF NOT EXISTS movies (
		movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
		tmdb_id INTEGER NOT NULL UNIQUE,
		title VARCHAR(255) NOT NULL,
		overview VARCHAR(255) NOT NULL,
		release_date VARCHAR(55),
		image_url VARCHAR(255)
	);
	`)

	return err
}

// LISTS
func (s *SQLiteStorage) createListsTable() error {
	_, err := s.db.Exec(
		`CREATE TABLE IF NOT EXISTS lists (
		list_id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		list_name VARCHAR(255) NOT NULL UNIQUE,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`)

	return err
}

// LISTMOVIES
func (s *SQLiteStorage) createListMoviesTable() error {
	_, err := s.db.Exec(
		`CREATE TABLE IF NOT EXISTS list_movies (
		list_id INTEGER NOT NULL,
		movie_id INTEGER NOT NULL,
		
		FOREIGN KEY (list_id) REFERENCES lists(list_id),
		FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
		PRIMARY KEY (list_id, movie_id)
	);
	`)

	return err
}
