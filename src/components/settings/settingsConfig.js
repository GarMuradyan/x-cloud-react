export let liveTvLock = {}
export let moviesLock = {}
export let seriesLock = {}

liveTvLock = localStorage.getItem('live-tv-lock') ? JSON.parse(localStorage.getItem('live-tv-lock')) : {}
moviesLock = localStorage.getItem('movies-lock') ? JSON.parse(localStorage.getItem('movies-lock')) : {}
seriesLock = localStorage.getItem('series-lock') ? JSON.parse(localStorage.getItem('series-lock')) : {}