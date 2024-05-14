package models

import "time"

type User struct {
	Id         int64     `json:"id" database:"id"`
	Username   string    `json:"username" database:"username"`
	Password   string    `json:"password" database:"password"`
	Email      string    `json:"email" database:"email"`
	Created_On time.Time `json:"created_on" database:"created_on"`
	Num_Lists  int64     `json:"num_lists" database:"num_lists"`
}
