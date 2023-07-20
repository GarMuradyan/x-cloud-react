async function get_series_data () {
    const CATEGORYURL = 'http://diblax.spartacus.site/player_api.php?username=WOYQyy5YzT&password=2WawEOAw0d&type=m3u_plus&output=ts&action=get_series_categories'
    const MOVIESURL = 'http://diblax.spartacus.site/player_api.php?username=WOYQyy5YzT&password=2WawEOAw0d&type=m3u_plus&output=ts&action=get_series'
    let vods = {}

    let json_data = await fetch(CATEGORYURL)
    let category = await json_data.json();

    for (let i = 0; i < category.length; i++) {
        vods[category[i].category_id] = { category_id: category[i].category_id, category_name: category[i].category_name, movies: [] }
    }

    let movies_json = await fetch(MOVIESURL)
    let movies = await movies_json.json();

    for (let i = 0; i < movies.length; i++) {
        if (vods[movies[i].category_id]) {
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


    return [MOVIESDATA, movies]
}

export default get_series_data