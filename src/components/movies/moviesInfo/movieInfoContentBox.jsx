import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../../remote/useKeydown"
import Portal from "../../portal.jsx"
import RenderMoviePlayerPage from '../moviePlayer/moviePlayer.jsx'
import { moviesFavorit } from "../favoritConfig"

function RenderMovieInfoContent ({ data, onClose, type }) {

    const buttonsInfo = [{ name: 'Play', type: "play" }, { name: 'Watch trailer', type: "trailer" }, { name: 'Favorit', type: 'favorit' }]
    const [showPlayer, setShowPlayer] = useState(false)

    const selectidMovie = useSelector(function (state) {
        return state.selectidMovie
    })

    const playerInfo = {
        src: `http://diblax.spartacus.site/movie/WOYQyy5YzT/2WawEOAw0d/${ selectidMovie.stream_id }.${ selectidMovie.container_extension }`,
        onClose: () => {
            setShowPlayer(false)
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
                console.log(selectidMovie);
                setShowPlayer(true)
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movie-player'
                        }
                    }
                )
            }
        } else if (val.type == 'favorit') {
            // if (type == 'movie') {
            //     const id = selectidMovie.stream_id
            //     console.log(selectidMovie);
            //     if (selectidMovie.favorit) {
            //         selectidMovie.favorit = false
            //         if (moviesFavorit[id]) {
            //             moviesFavorit[id].favorit = false
            //         } else {
            //             moviesFavorit[id] = { favorit: false }
            //         }
            //         localStorage.setItem('movies-favorit', JSON.stringify(moviesFavorit))
            //     } else {
            //         selectidMovie.favorit = true
            //         if (moviesFavorit[id]) {
            //             moviesFavorit[id].favorit = true
            //         } else {
            //             moviesFavorit[id] = { favorit: true }
            //         }
            //         localStorage.setItem('movies-favorit', JSON.stringify(moviesFavorit))
            //     }
            // }
        }
    }

    let [isIndex, setIsIndex] = useState(0)
    const dispatch = useDispatch()
    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

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
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'movie-info-back'
                    }
                }
            )
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
                        <div key={i} className={control.isActive && isIndex == i ? "movie-info-content-button-box active" : "movie-info-content-button-box"} onClick={() => {

                            buttonsClick(val)

                        }}>{val.name}</div>
                    )

                })}

            </div>


            {showPlayer ? <Portal element={<RenderMoviePlayerPage {...playerInfo} />}></Portal> : false}

        </div>
    )
}

export default RenderMovieInfoContent