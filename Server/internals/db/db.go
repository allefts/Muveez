package db

import (
	"database/sql"
	"fmt"

	"github.com/allefts/muveez_server/internals/models"
	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func ConnectDB(dbName string) error {
	var (
		err error
	)

	DB, err = sql.Open("sqlite3", dbName)

	if err != nil {
		return fmt.Errorf("failed to connect to database %s", err)
	}

	return nil
}

func GetDB() *sql.DB {
	return DB
}

func GetUserById(username string) (models.User, error) {
	row := DB.QueryRow("SELECT * FROM users WHERE username = ?", username)
	user := models.User{}
	var timeStampString string
	err := row.Scan(&user.Id, &user.Username, &user.Password, &user.Email, &timeStampString, &user.Num_Lists)

	if err != nil {
		return models.User{}, err
	}

	if err != nil {
		return models.User{}, err
	}

	return user, nil
}
