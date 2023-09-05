export const liveFavoriteCategory = {
    category_id: "-0",
    category_name: 'Favorites',
    channels: []
}

export const liveAllCategory = {
    category_id: "-1",
    category_name: 'All',
    channels: []
}

export const liveSearchCategory = {
    category_id: "-2",
    category_name: 'Search',
    channels: []
}

export let liveTvFavorits = {}

console.log(localStorage.getItem('live-favorit'))

liveTvFavorits = localStorage.getItem('live-favorit') ? JSON.parse(localStorage.getItem('live-favorit')) : {}
