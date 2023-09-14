import { movieFavoritArr } from "../movies/favoritConfig"

async function get_movies_data () {
    const CATEGORYURL = 'http://xtream.in:9000/player_api.php?username=Aa6262699165AYR52&password=Aa52527965QGDS4256&type=m3u&action=get_vod_categories'
    const MOVIESURL = 'http://xtream.in:9000/player_api.php?username=Aa6262699165AYR52&password=Aa52527965QGDS4256&type=m3u&action=get_vod_streams'
    let vods = {}
    const movies_favorite = localStorage.getItem('movies-favorit') ? JSON.parse(localStorage.getItem('movies-favorit')) : {}

    let json_data = await fetch(CATEGORYURL)
    let category = await json_data.json();

    for (let i = 0; i < category.length; i++) {
        vods[category[i].category_id] = { category_id: category[i].category_id, category_name: category[i].category_name, movies: [] }
    }

    let movies_json = await fetch(MOVIESURL)
    let movies = await movies_json.json();

    for (let i = 0; i < movies.length; i++) {
        if (vods[movies[i].category_id]) {
            if (movies_favorite[movies[i].stream_id]) {
                if (movies_favorite[movies[i].stream_id].favorit) {
                    movies[i].favorit = true
                    movieFavoritArr.movies.push(movies[i])
                }
            }
            vods[movies[i].category_id].movies.push(movies[i])
        }
    }

    const ARR = Object.values(vods)
    const MOVIESDATA = []

    for (let i = 0; i < ARR.length; i++) {
        if (ARR[i].movies.length) {
            MOVIESDATA.push(ARR[i])
        }
    }

    if (movieFavoritArr.movies.length) {
        MOVIESDATA.unshift(movieFavoritArr)
    }


    return [MOVIESDATA, movies]
}

export default get_movies_data



