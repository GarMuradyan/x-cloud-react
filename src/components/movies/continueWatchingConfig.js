export let moviesContinueWatching = {}
export let seriesContinueWatching = {}

moviesContinueWatching = localStorage.getItem('movies-continue') ? JSON.parse(localStorage.getItem('movies-continue')) : {}
seriesContinueWatching = localStorage.getItem('series-continue') ? JSON.parse(localStorage.getItem('series-continue')) : {}
