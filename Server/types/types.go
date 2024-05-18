package types

type User struct {
	UserId    uint32 `json:"user_id"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
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
