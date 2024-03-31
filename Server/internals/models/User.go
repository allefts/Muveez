package models

import "time"

type LoginUser struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type User struct {
	Id         int64     `json:"id" database:"id"`
	Username   string    `json:"username" database:"username"`
	Password   string    `json:"password" database:"password"`
	Email      string    `json:"email" database:"email"`
	Created_On time.Time `json:"created_on" database:"password"`
	Num_Lists  int64     `json:"num_lists" database:"password"`
}
