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

func (s *Storage) GetUserListsWithMovies(userID int) ([]*types.ListsWithMovies, error) {
	// rows, err := s.db.Query("SELECT * FROM lists where user_id = ?", userID)
	rows, err := s.db.Query(`
	SELECT movies.*, lists.* FROM lists
	JOIN list_movies ON lists.list_id = list_movies.list_id 
	JOIN movies ON movies.movie_id = list_movies.movie_id  
	WHERE lists.user_id = ?;`, userID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	listsMap := make(map[int]*types.ListsWithMovies)
	//Loop through each row, scan into a temp movie and a temp listmovies. Sort movies into lists by list_id through map key.
	for rows.Next() {
		var movie types.Movie
		listMovie := &types.ListsWithMovies{List: types.List{}, Movies: []types.Movie{}}

		if err := rows.Scan(&movie.MovieId, &movie.TmdbId, &movie.Title, &movie.Overview, &movie.ReleaseDate, &movie.ImageURL, &listMovie.List.ListID, &listMovie.List.UserID, &listMovie.List.ListName, &listMovie.List.CreatedAt); err != nil {
			return nil, err
		}

		// listMovie.Movies = append(listMovie.Movies, movie)
		if _, ok := listsMap[listMovie.List.ListID]; !ok {
			listsMap[listMovie.List.ListID] = listMovie
		}

		//Structs inside maps cannot be modified directly
		listToAddTo := listsMap[listMovie.List.ListID]
		listToAddTo.Movies = append(listToAddTo.Movies, movie)

	}

	//Map listsMap to Slice
	var listWithMoviesSlice []*types.ListsWithMovies

	for _, list := range listsMap {
		listWithMoviesSlice = append(listWithMoviesSlice, list)
	}

	return listWithMoviesSlice, nil
}
