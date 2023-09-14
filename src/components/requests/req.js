function req (url, method, data) {

    var promise = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest()

        xhr.open(method, url)

        data ? xhr.setRequestHeader('Content-Type', 'application/json') : false

        data ? xhr.send(JSON.stringify(data)) : xhr.send()

        xhr.onload = function () {
            resolve(JSON.parse(xhr.response))
        }

        xhr.onerror = function () {
            reject('error')
        }

        Promise.prototype.abort = function () {
            xhr.abort()
        }

    })

    return promise

}


export default req