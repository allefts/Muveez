package services

import (
	"database/sql"
	"time"
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

func (u *UserServices) CreateUser() {

}
