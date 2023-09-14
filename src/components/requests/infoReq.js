import req from './req.js'

function GET_INFO_DATA (id, cb, type) {
    let url = null

    if (type == 'series') {
        url = 'http://xtream.in:9000/player_api.php?username=Aa6262699165AYR52&password=Aa52527965QGDS4256&type=m3u&action=get_series_info&series_id=' + id
    } else {
        url = 'http://xtream.in:9000/player_api.php?username=Aa6262699165AYR52&password=Aa52527965QGDS4256&type=m3u&action=get_vod_info&vod_id=' + id
    }

    const promise = req(url, 'GET', null).then(function (res) {
        cb(res)
    }).catch(function (err) {
        cb(err)
    })

    return promise
}

export default GET_INFO_DATA