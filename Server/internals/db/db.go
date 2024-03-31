package db

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

func ConnectDB(dbName string) (*sql.DB, error) {
	var (
		db  *sql.DB
		err error
	)

	db, err = sql.Open("sqlite3", dbName)

	if err != nil {
		return nil, fmt.Errorf("failed to connect to database %s", err)
	}

	return db, nil
}
