import { seriesFavoritArr } from "../movies/favoritConfig"

async function get_series_data () {
    const CATEGORYURL = 'http://xtream.in:9000/player_api.php?username=Aa6262699165AYR52&password=Aa52527965QGDS4256&type=m3u&action=get_series_categories'
    const MOVIESURL = 'http://xtream.in:9000/player_api.php?username=Aa6262699165AYR52&password=Aa52527965QGDS4256&type=m3u&action=get_series'
    let vods = {}
    const series_favorite = localStorage.getItem('series-favorit') ? JSON.parse(localStorage.getItem('series-favorit')) : {}

    let json_data = await fetch(CATEGORYURL)
    let category = await json_data.json();

    for (let i = 0; i < category.length; i++) {
        vods[category[i].category_id] = { category_id: category[i].category_id, category_name: category[i].category_name, movies: [] }
    }

    let movies_json = await fetch(MOVIESURL)
    let movies = await movies_json.json();

    for (let i = 0; i < movies.length; i++) {
        if (vods[movies[i].category_id]) {
            if (series_favorite[movies[i].series_id]) {
                if (series_favorite[movies[i].series_id].favorit) {
                    movies[i].favorit = true
                    seriesFavoritArr.movies.push(movies[i])
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

    if (seriesFavoritArr.movies.length) {
        MOVIESDATA.unshift(seriesFavoritArr)
    }


    return [MOVIESDATA, movies]
}

export default get_series_data