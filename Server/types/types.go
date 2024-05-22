package types

import "time"

type User struct {
	UserId    int       `json:"user_id"`
	GoogleID  string    `json:"google_id"`
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
	ListName  string  `json:"list_name"`
	NumMovies uint32  `json:"num_movies"`
	Movies    []Movie `json:"movies"`
}

type Movie struct {
	MovieId     uint32 `json:"movie_id"`
	TmdbId      int32  `json:"tmdb_id"`
	Title       string `json:"title"`
	ReleaseDate string `json:"release_date"`
	ImageURL    string `json:"image_url"`
}

type ListMovie struct {
	ListId  int32 `json:"list_id"`
	MovieId int32 `json:"movie_id"`
}

type Error struct {
	Message string `json:"message"`
}
