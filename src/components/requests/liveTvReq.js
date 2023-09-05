import { liveAllCategory, liveFavoriteCategory, liveSearchCategory, liveTvFavorits } from "../liveTv/liveTVConfig";

async function GET_LIVE_TV_DATA () {
    const categoryUrl = 'https://globoplay.one/player_api.php?username=2452366&password=8950273&type=m3u_plus&output=ts&action=get_live_categories'
    const chanelUrl = 'https://globoplay.one/player_api.php?username=2452366&password=8950273&type=m3u_plus&output=ts&action=get_live_streams'
    let vods = {}

    let json_data = await fetch(categoryUrl)
    let category = await json_data.json();

    for (let i = 0; i < category.length; i++) {
        vods[category[i].category_id] = { category_id: category[i].category_id, category_name: category[i].category_name, channels: [] }
    }

    let channels_json = await fetch(chanelUrl)
    let channels = await channels_json.json();

    for (let i = 0; i < channels.length; i++) {
        if (vods[channels[i].category_id]) {
            if (liveTvFavorits[channels[i].stream_id]) {
                liveFavoriteCategory.channels.push(channels[i])
            }
            vods[channels[i].category_id].channels.push(channels[i])
        }
    }

    liveAllCategory.channels = channels
    liveSearchCategory.channels = channels

    console.log(liveFavoriteCategory)

    const ARR = Object.values(vods)
    const MOVIESDATA = []

    for (let i = 0; i < ARR.length; i++) {
        if (ARR[i].channels.length) {
            MOVIESDATA.push(ARR[i])
        }
    }
    MOVIESDATA.unshift(liveSearchCategory)
    MOVIESDATA.unshift(liveAllCategory)
    MOVIESDATA.unshift(liveFavoriteCategory)

    console.log(MOVIESDATA)


    return [MOVIESDATA, channels]
}

export default GET_LIVE_TV_DATA