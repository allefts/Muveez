package services

import (
	"database/sql"
	"fmt"

	"github.com/allefts/muveez_server/internals/models"
	"github.com/allefts/muveez_server/internals/utils"
	"golang.org/x/crypto/bcrypt"
)

type UserServices struct {
	User models.User
	Db   *sql.DB
}

func NewUserService(user models.User, db *sql.DB) *UserServices {
	return &UserServices{
		User: user,
		Db:   db,
	}
}

func (u *UserServices) CreateUser() error {
	query, err := u.Db.Prepare("INSERT INTO users(email, username, password) VALUES(?, ?, ?)")
	if err != nil {
		return fmt.Errorf("error preparing query")
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(u.User.Password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("error hashing password")
	}

	_, err = query.Exec(u.User.Email, u.User.Username, hashedPass)
	if err != nil {
		return fmt.Errorf("error with creating user query")
	}

	return nil
}

func (u *UserServices) GetUserByUsername(username string) (models.User, error) {
	var user models.User
	var tempTime string

	row := u.Db.QueryRow("SELECT * FROM users WHERE username = ?", username)
	tempErr := row.Err()
	if tempErr != nil {
		return models.User{}, fmt.Errorf("getting user by username row error")
	}

	err := row.Scan(&user.Id, &user.Username, &user.Password, &user.Email, &tempTime, &user.Num_Lists)

	//No Found User
	if err != nil {
		return models.User{}, fmt.Errorf("no user found: %s", username)
	}

	user.Created_On = utils.TimeToYear(tempTime[:10])
	return user, nil
}
