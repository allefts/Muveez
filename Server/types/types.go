package types

import "time"

type User struct {
	UserID    int       `json:"user_id" db:"user_id"`
	GoogleID  string    `json:"google_id" db:"google_id"`
	UserName  string    `json:"username" db:"username"`
	Email     string    `json:"email" db:"email"`
	Name      string    `json:"name" db:"name"`
	AvatarURL string    `json:"avatar_url" db:"avatar_url"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

type UserSession struct {
	Name     string `json:"name"`
	GoogleID string `json:"google_id"`
	Email    string `json:"email"`
}

type List struct {
	ListID    int       `json:"list_id" db:"list_id"`
	UserID    int       `json:"user_id" db:"user_id"`
	ListName  string    `json:"list_name" db:"list_name"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

type Movie struct {
	MovieId     int    `json:"movie_id" db:"movie_id"`
	TmdbId      int    `json:"tmdb_id" db:"tmdb_id"`
	Title       string `json:"title" db:"title"`
	Overview    string `json:"overview" db:"overview"`
	ReleaseDate string `json:"release_date" db:"release_date"`
	ImageURL    string `json:"image_url" db:"image_url"`
}

type ListsWithMovies struct {
	List   List    `json:"list"`
	Movies []Movie `json:"movies"`
}

type ListMovie struct {
	ListId  int `json:"list_id" db:"list_id"`
	MovieId int `json:"movie_id" db:"movie_id"`
}

type ListMovieIDS struct {
	ListId  int `json:"list_id" db:"list_id"`
	MovieId int `json:"movie_id" db:"movie_id"`
}

type Error struct {
	Message string `json:"message"`
}
