package services

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/allefts/muveez_server/internals/utils"
)

type User struct {
	Id         int64     `json:"id" database:"id"`
	Username   string    `json:"username" database:"username"`
	Password   string    `json:"password" database:"password"`
	Email      string    `json:"email" database:"email"`
	Created_On time.Time `json:"created_on" database:"created_on"`
	Num_Lists  int64     `json:"num_lists" database:"num_lists"`
}

type UserServices struct {
	User User
	Db   *sql.DB
}

func NewUserService(user User, db *sql.DB) *UserServices {
	return &UserServices{
		User: user,
		Db:   db,
	}
}

func (u *UserServices) CreateUser() error {
	return nil
}

func (u *UserServices) GetUserByUsername(username string) (User, error) {
	var user User
	var tempTime string

	row := u.Db.QueryRow("SELECT * FROM users WHERE username = ?", username)

	tempErr := row.Err()
	fmt.Println("Scan Error: ", tempErr)

	err := row.Scan(&user.Id, &user.Username, &user.Password, &user.Email, &tempTime, &user.Num_Lists)

	//No Found User
	if err != nil {
		return User{}, fmt.Errorf("no user found: %s", username)
	}

	user.Created_On = utils.TimeToYear(tempTime[:10])
	return user, nil
}
