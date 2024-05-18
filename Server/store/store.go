package store

import "database/sql"

type Storage struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Storage {
	return &Storage{
		db: db,
	}
}

type Store interface {
	//Methods that hit db, basically just SQL query functions
}
