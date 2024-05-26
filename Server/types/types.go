package types

import "time"

type User struct {
	UserID    int       `json:"user_id"`
	GoogleID  string    `json:"google_id"`
	UserName  string    `json:"username"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	AvatarURL string    `json:"avatar_url"`
	CreatedAt time.Time `json:"created_at"`
}

type UserSession struct {
	Name     string `json:"name"`
	GoogleID string `json:"google_id"`
	Email    string `json:"email"`
}

type List struct {
	ListID    int       `json:"list_id"`
	UserID    int       `json:"user_id"`
	ListName  string    `json:"list_name"`
	CreatedAt time.Time `json:"create_at"`
	// NumMovies int       `json:"num_movies"`
	// Movies    []Movie
}

type Movie struct {
	MovieId     int    `json:"movie_id"`
	TmdbId      int    `json:"tmdb_id"`
	Title       string `json:"title"`
	ReleaseDate string `json:"release_date"`
	ImageURL    string `json:"image_url"`
}

type ListMovie struct {
	ListId  int `json:"list_id"`
	MovieId int `json:"movie_id"`
}

type Error struct {
	Message string `json:"message"`
}
