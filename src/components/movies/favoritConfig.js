export let moviesFavorit = {}

moviesFavorit = localStorage.getItem('movies-favorit') ? JSON.parse(localStorage.getItem('movies-favorit')) : {}
