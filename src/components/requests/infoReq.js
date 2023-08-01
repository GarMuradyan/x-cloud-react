import req from './req.js'

function GET_INFO_DATA (id, cb, type) {
    let url = null

    if (type == 'series') {
        url = 'http://diblax.spartacus.site/player_api.php?username=WOYQyy5YzT&password=2WawEOAw0d&type=m3u_plus&output=ts&action=get_series_info&series_id=' + id
    } else {
        url = 'http://diblax.spartacus.site/player_api.php?username=WOYQyy5YzT&password=2WawEOAw0d&type=m3u_plus&output=ts&action=get_vod_info&vod_id=' + id
    }

    const promise = req(url, 'GET', null).then(function (res) {
        cb(res)
    }).catch(function (err) {
        cb(err)
    })

    return promise
}

export default GET_INFO_DATA