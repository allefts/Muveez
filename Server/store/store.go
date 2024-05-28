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
	GetUser(email string) (types.User, error)
	GetUserIDFromEmail(email string) (int, error)
	IsThereUser(email string) bool
	CreateUser(user goth.User)

	//LIST_MOVIES QUERIES
	GetUserListsWithMovies(userId string) ([]types.List, error)
}

// **************USER**************

// userID is stored only on db, googleID comes from OAuth, need to query userID...
func (s *Storage) GetUserIDFromEmail(email string) (int, error) {
	row, err := s.db.Query("SELECT user_id FROM users WHERE email = ? LIMIT 1", email)
	if err != nil {
		return 0, err
	}

	defer row.Close()

	if !row.Next() {
		return 0, fmt.Errorf("no user found")
	}

	var userID int

	err = row.Scan(&userID)
	if err != nil {
		return 0, err
	}

	return userID, nil

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

// **************LISTS**************

func (s *Storage) GetUserListsWithMovies(userID int) ([]types.List, error) {
	// rows, err := s.db.Query("SELECT * FROM lists where user_id = ?", userID)
	rows, err := s.db.Query(`
		SELECT movies.*, lists.* FROM movies 
		JOIN users ON users.user_id = lists.user_id 
		JOIN list_movies ON movies.movie_id = list_movies.movie_id 
		JOIN lists ON lists.list_id = list_movies.list_id  
		WHERE users.user_id = ?;`, userID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	listWithMovies := types.ListWithMovies{
		List:   types.List{},
		Movies: []types.Movie{},
	}
	for rows.Next() {
		var movie types.Movie
		if err := rows.Scan(&movie.MovieId, &movie.TmdbId, &movie.Title, &movie.Overview, &movie.ReleaseDate, &movie.ImageURL, &listWithMovies.List.ListID, &listWithMovies.List.UserID, &listWithMovies.List.ListName, &listWithMovies.List.CreatedAt); err != nil {
			return nil, err
		}
		listWithMovies.Movies = append(listWithMovies.Movies, movie)
	}

	return nil, nil
}
