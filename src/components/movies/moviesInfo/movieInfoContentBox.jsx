import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../../remote/useKeydown"
import Portal from "../../portal.jsx"
import RenderMoviePlayerPage from '../moviePlayer/moviePlayer.jsx'
import { movieFavoritArr, moviesFavorit, seriesFavorit, seriesFavoritArr } from "../favoritConfig"
import words from "../../settings/words"
import { events, onPlayerEvent, playerEvents, sendPlayerEvent } from "../../../remote/socket"
import { socket } from "../../../App"
import { useLocation, useNavigate } from "react-router-dom"
import RenderGroupWatching from '../../groupWatching/groupWatching.jsx'

function RenderMovieInfoContent ({ data, onClose, type, similar, setSimilarMovies, infoPageState }) {

    const selectidMovie = useSelector(function (state) {
        return state.selectidMovie
    })
    const movieData = useSelector(function (state) {
        return state.movieData
    })
    const seriesData = useSelector(function (state) {
        return state.seriesData
    })
    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const buttonsInfo = [{ name: words[localStorage.getItem('language')].play, type: "play", id: 0 }, { name: words[localStorage.getItem('language')].groupWatching, type: "group", id: 1 }, { name: words[localStorage.getItem('language')].watchTrailer, type: "trailer", id: 2 }, { name: moviesFavorit[selectidMovie.stream_id] || seriesFavorit[selectidMovie.series_id] ? words[localStorage.getItem('language')].unFavorite : words[localStorage.getItem('language')].favorite, type: 'favorit', id: 3 }]
    const [moviesCategories, movies] = movieData ? movieData : [{}, {}]
    const [seriesCategories, series] = seriesData ? seriesData : [{}, {}]

    let [isIndex, setIsIndex] = useState(0)
    const [showGroupModal, setShowGroupModal] = useState(false)

    let playerInfo = {
        src: `http://xtream.in:9000/movie/Aa6262699165AYR52/Aa52527965QGDS4256/${ selectidMovie.stream_id }.${ selectidMovie.container_extension }`,
        movie: selectidMovie,
        type: type
    }

    const groupOnClose = {
        onClose: () => {
            setShowGroupModal(false)
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'movie-info-buttons'
                    }
                }
            )
        }
    }

    const buttonsClick = (val) => {
        if (val.type == 'play') {
            if (type == 'movie') {
                sendPlayerEvent(playerEvents.setupDataSource, { playerInfo: playerInfo, infoPageState: infoPageState, selectidMovie: selectidMovie })
            }
        } else if (val.type == 'group') {
            setShowGroupModal(true)
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'group-buttons'
                    }
                }
            )
        } else if (val.type == 'favorit') {
            if (type == 'movie') {
                const id = selectidMovie.stream_id
                if (moviesFavorit[id]) {
                    selectidMovie.favorit = false
                    for (let i = 0; i < movieFavoritArr.movies.length; i++) {
                        if (movieFavoritArr.movies[i].stream_id == id) {
                            movieFavoritArr.movies.splice(i, 1)
                        }
                    }
                    if (movieFavoritArr.movies.length == 0) {
                        for (let i = 0; i < moviesCategories.length; i++) {
                            if (moviesCategories[i] == movieFavoritArr) {
                                moviesCategories.splice(i, 1)
                            }
                        }
                    }
                    dispatch(
                        {
                            type: 'CHANGE_SELECTID_MOVIE',
                            payload: {
                                movie: selectidMovie
                            }
                        }
                    )
                    dispatch(
                        {
                            type: 'CANGE_MOVIE_DATA',
                            payload: {
                                data: [
                                    moviesCategories,
                                    movies
                                ]
                            }
                        }
                    )
                    if (moviesFavorit[id]) {
                        delete moviesFavorit[id]
                    }
                    localStorage.setItem('movies-favorit', JSON.stringify(moviesFavorit))
                } else {
                    for (let i = 0; i < moviesCategories.length; i++) {
                        if (moviesCategories[i] == movieFavoritArr) {
                            moviesCategories.splice(i, 1)
                        }
                    }
                    selectidMovie.favorit = true
                    movieFavoritArr.movies.push(selectidMovie)
                    moviesCategories.unshift(movieFavoritArr)
                    dispatch(
                        {
                            type: 'CHANGE_SELECTID_MOVIE',
                            payload: {
                                movie: selectidMovie
                            }
                        }
                    )
                    dispatch(
                        {
                            type: 'CANGE_MOVIE_DATA',
                            payload: {
                                data: [
                                    moviesCategories,
                                    movies
                                ]
                            }
                        }
                    )
                    if (moviesFavorit[id]) {
                        moviesFavorit[id].favorit = true
                    } else {
                        moviesFavorit[id] = { favorit: true }
                    }
                    localStorage.setItem('movies-favorit', JSON.stringify(moviesFavorit))
                }
                setSimilarMovies([...similar])
            } else if (type == 'series') {
                const id = selectidMovie.series_id
                if (seriesFavorit[id]) {
                    selectidMovie.favorit = false
                    for (let i = 0; i < seriesFavoritArr.movies.length; i++) {
                        if (seriesFavoritArr.movies[i].series_id == id) {
                            seriesFavoritArr.movies.splice(i, 1)
                        }
                    }
                    if (seriesFavoritArr.movies.length == 0) {
                        for (let i = 0; i < seriesCategories.length; i++) {
                            if (seriesCategories[i] == seriesFavoritArr) {
                                seriesCategories.splice(i, 1)
                            }
                        }
                    }
                    dispatch(
                        {
                            type: 'CHANGE_SELECTID_MOVIE',
                            payload: {
                                movie: selectidMovie
                            }
                        }
                    )
                    dispatch(
                        {
                            type: 'CANGE_SERIES_DATA',
                            payload: {
                                data: [
                                    seriesCategories,
                                    series
                                ]
                            }
                        }
                    )
                    if (seriesFavorit[id]) {
                        delete seriesFavorit[id]
                    }
                    localStorage.setItem('series-favorit', JSON.stringify(seriesFavorit))
                } else {
                    for (let i = 0; i < seriesCategories.length; i++) {
                        if (seriesCategories[i] == seriesFavoritArr) {
                            seriesCategories.splice(i, 1)
                        }
                    }
                    selectidMovie.favorit = true
                    seriesFavoritArr.movies.push(selectidMovie)
                    seriesCategories.unshift(seriesFavoritArr)
                    dispatch(
                        {
                            type: 'CHANGE_SELECTID_MOVIE',
                            payload: {
                                movie: selectidMovie
                            }
                        }
                    )
                    dispatch(
                        {
                            type: 'CANGE_SERIES_DATA',
                            payload: {
                                data: [
                                    seriesCategories,
                                    series
                                ]
                            }
                        }
                    )
                    if (seriesFavorit[id]) {
                        seriesFavorit[id].favorit = true
                    } else {
                        seriesFavorit[id] = { favorit: true }
                    }
                    localStorage.setItem('series-favorit', JSON.stringify(seriesFavorit))
                }
                console.log('serie-favorit')
            }
        }
    }

    let control = {
        isActive: currentControls == 'movie-info-buttons',

        ok: function (e) {
            buttonsClick(buttonsInfo[isIndex])
        },

        left: function (e) {
            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {
            if (isIndex < buttonsInfo.length - 1) {
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {

        },

        down: function (e) {
            if (type == 'series') {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movie-info-seasons-button'
                        }
                    }
                )
            } else {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movie-info-similar'
                        }
                    }
                )
            }

        },

        back: () => {
            onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="movie-info-content-box" >

            <div className="movie-info-content-name-box">{data.info.name || data.movie_data.name}</div>

            <div className="movie-info-content-desc-box">{data.info.plot || data.info.description}</div>

            <div className="movie-info-content-buttons-box">

                {buttonsInfo.map((val, i) => {

                    return (
                        <div key={val.id} className={control.isActive && isIndex == i ? "movie-info-content-button-box active" : "movie-info-content-button-box"} onClick={() => {

                            buttonsClick(val)

                        }}>{val.name}</div>
                    )

                })}

            </div>

            {showGroupModal ? <Portal element={<RenderGroupWatching {...groupOnClose} />} /> : false}

        </div>
    )
}

export default RenderMovieInfoContent