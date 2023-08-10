import req from './req.js'

function GET_INFO_DATA (id, cb, type) {
    let url = null

    if (type == 'series') {
        url = 'https://globoplay.one/player_api.php?username=2452366&password=8950273&type=m3u_plus&output=ts&action=get_series_info&series_id=' + id
    } else {
        url = 'https://globoplay.one/player_api.php?username=2452366&password=8950273&type=m3u_plus&output=ts&action=get_vod_info&vod_id=' + id
    }

    const promise = req(url, 'GET', null).then(function (res) {
        cb(res)
    }).catch(function (err) {
        cb(err)
    })

    return promise
}

export default GET_INFO_DATA