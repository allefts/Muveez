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
	GetUser(email string) (*types.User, error)
	IsThereUser(email string) bool
	CreateUser(user goth.User)
}

func (s *Storage) GetUser(email string) (*types.User, error) {
	row, err := s.db.Query("SELECT * FROM users WHERE email = ? LIMIT 1", email)
	if err != nil {
		return nil, err
	}

	defer row.Close()

	if !row.Next() {
		return nil, fmt.Errorf("no user found")
	}

	var user types.User
	err = row.Scan(&user.UserId, &user.GoogleID, &user.Email, &user.Name, &user.AvatarURL, &user.CreatedAt)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (s *Storage) IsThereUser(email string) bool {
	row, _ := s.db.Query("SELECT * FROM users where email = ? LIMIT 1", email)
	defer row.Close()
	return row.Next()
}

func (s *Storage) CreateUser(user goth.User) error {
	_, err := s.db.Exec("INSERT INTO users (google_id, email, name, avatar_url) VALUES (?, ?, ?, ?)", user.UserID, user.Email, user.Name, user.AvatarURL)
	if err != nil {
		return err
	}

	return nil
}
