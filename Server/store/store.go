package store

import (
	"database/sql"
	"fmt"

	"github.com/allefts/muveez_server/types"
	"github.com/markbates/goth"
)

type Storage struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Storage {
	return &Storage{
		db: db,
	}
}

type Store interface {
	//Methods that hit db, basically just SQL queries

	//USER QUERIES
	GetUser(email string) (*types.User, error)
	IsThereUser(email string) bool
	CreateUser(user goth.User)

	//LIST_MOVIES QUERIES
	GetUserLists(userId string) ([]types.List, error)
}

func (s *Storage) GetUser(email string) (types.User, error) {
	row, err := s.db.Query("SELECT * FROM users WHERE email = ? LIMIT 1", email)
	if err != nil {
		return types.User{}, err
	}

	defer row.Close()

	if !row.Next() {
		return types.User{}, fmt.Errorf("no user found")
	}

	var user types.User
	err = row.Scan(&user.UserID, &user.GoogleID, &user.Email, &user.UserName, &user.Name, &user.AvatarURL, &user.CreatedAt)
	if err != nil {
		return types.User{}, err
	}

	return user, nil
}

func (s *Storage) IsThereUser(email string) bool {
	row, _ := s.db.Query("SELECT * FROM users where email = ? LIMIT 1", email)
	defer row.Close()
	return row.Next()
}

func (s *Storage) CreateUser(user goth.User) error {
	_, err := s.db.Exec("INSERT INTO users (google_id, email, username, name, avatar_url) VALUES (?, ?, \"\", ?, ?)", user.UserID, user.Email, user.Name, user.AvatarURL)
	if err != nil {
		return err
	}

	return nil
}

func (s *Storage) GetUserLists(userId int) ([]types.List, error) {
	rows, err := s.db.Query("SELECT * FROM lists where user_id = ?", userId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var lists []types.List
	for rows.Next() {
		var list types.List
		if err := rows.Scan(&list.ListID, &list.UserID, &list.ListName, &list.CreatedAt); err != nil {
			return lists, nil
		}
	}

	return nil, err
}
