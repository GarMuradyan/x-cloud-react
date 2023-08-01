export let moviesFavorit = {}
export let movieFavoritArr = {
    category_id: 0,
    category_name: 'Favorites',
    movies: []
}
export let seriesFavorit = {}
export let seriesFavoritArr = {
    category_id: 0,
    category_name: 'Favorites',
    movies: []
}

moviesFavorit = localStorage.getItem('movies-favorit') ? JSON.parse(localStorage.getItem('movies-favorit')) : {}
seriesFavorit = localStorage.getItem('series-favorit') ? JSON.parse(localStorage.getItem('series-favorit')) : {}
