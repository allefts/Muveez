package store

import (
	"database/sql"
	"fmt"
	"strconv"

	"github.com/allefts/muveez_server/types"
	"github.com/charmbracelet/log"
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
	GetUserListsWithMovies(userID string) ([]types.List, error)
	GetUserListMovie(listID string) (types.ListsWithMovies, error)
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

// GETS USER BY EMAIL
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

// CHECKS FOR USER BY EMAIL
func (s *Storage) IsThereUser(email string) bool {
	row, _ := s.db.Query("SELECT * FROM users where email = ? LIMIT 1", email)
	defer row.Close()
	return row.Next()
}

// CREATES USER
func (s *Storage) CreateUser(user goth.User) error {
	_, err := s.db.Exec("INSERT INTO users (google_id, email, username, name, avatar_url) VALUES (?, ?, \"\", ?, ?);", user.UserID, user.Email, user.Name, user.AvatarURL)
	if err != nil {
		return err
	}

	return nil
}

// **************LISTS**************
// CHECKS FOR A LIST MADE BY A USER AND BY LIST NAME
func (s *Storage) CheckForList(userID int, listName string) (bool, error) {
	row, err := s.db.Query(`SELECT 1 FROM lists WHERE user_id = ? AND list_name = ?;`, userID, listName)

	if err != nil {
		return false, err
	}

	defer row.Close()

	if row.Next() {
		return true, fmt.Errorf("list name already exists")
	}

	return false, nil
}

// CREATES A LIST
func (s *Storage) CreateList(userID int, listName string) error {
	_, err := s.db.Exec(`INSERT INTO lists (user_id, list_name) VALUES (?, ?);`, userID, listName)
	if err != nil {
		return err
	}

	return nil
}

// GET ALL USER LISTS
func (s *Storage) GetUserLists(userID int) ([]types.List, error) {
	rows, err := s.db.Query("SELECT * FROM lists where user_id = ?", userID)
	if err != nil {
		log.Info(err)
	}

	defer rows.Close()

	var lists []types.List
	for rows.Next() {
		var list types.List
		if err := rows.Scan(&list.ListID, &list.UserID, &list.ListName, &list.CreatedAt); err != nil {
			return nil, err
		}
		lists = append(lists, list)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return lists, nil
}

// GET ALL USER LISTS WITH ALL MOVIES
func (s *Storage) GetUserListsWithMovies(userID int) ([]types.ListsWithMovies, error) {
	lists, err := s.GetUserLists(userID)
	if err != nil {
		return nil, err
	}

	var listsWithMovies []types.ListsWithMovies
	for _, list := range lists {
		movies, err := s.GetUserMoviesFromList(list.ListID)
		if err != nil {
			return nil, err
		}
		listsWithMovies = append(listsWithMovies, types.ListsWithMovies{List: list, Movies: movies})
	}

	return listsWithMovies, nil
}

// GET ALL MOVIES FROM A LIST BY ID
func (s *Storage) GetUserMoviesFromList(listID int) ([]types.Movie, error) {
	rows, err := s.db.Query(`SELECT movies.*
	FROM movies
	JOIN list_movies ON movies.movie_id = list_movies.movie_id
	JOIN lists ON list_movies.list_id = lists.list_id
	WHERE lists.list_id = ?`, listID)

	if err != nil {
		return nil, nil
	}
	defer rows.Close()

	// var movies []types.Movie
	movies := []types.Movie{}
	for rows.Next() {
		var movie types.Movie
		if err := rows.Scan(&movie.MovieId, &movie.TmdbId, &movie.Title, &movie.Overview, &movie.ReleaseDate, &movie.ImageURL); err != nil {
			return nil, err
		}
		movies = append(movies, movie)
	}

	return movies, nil
}

func (s *Storage) GetUserList(listID int) (types.List, error) {
	row, err := s.db.Query("SELECT * FROM lists WHERE list_id = ?", listID)

	if err != nil {
		return types.List{}, err
	}

	defer row.Close()

	if !row.Next() {
		return types.List{}, fmt.Errorf("no row getuserlist")
	}

	list := types.List{}
	if err := row.Scan(&list.ListID, &list.UserID, &list.ListName, &list.CreatedAt); err != nil {
		return types.List{}, err
	}

	return list, nil
}

// GET JUST ONE LIST WITH ALL ITS MOVIES AND ALL LIST INFORMATION
func (s *Storage) GetUserListMovie(listID string) (types.ListsWithMovies, error) {
	listIdInt, err := strconv.Atoi(listID)
	if err != nil {
		return types.ListsWithMovies{}, err
	}

	list, err := s.GetUserList(listIdInt)
	if err != nil {
		return types.ListsWithMovies{}, err
	}

	movies, err := s.GetUserMoviesFromList(listIdInt)
	if err != nil {
		return types.ListsWithMovies{}, err
	}

	return types.ListsWithMovies{List: list, Movies: movies}, nil
}
