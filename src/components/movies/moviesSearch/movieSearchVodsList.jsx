import { useDispatch, useSelector } from "react-redux"
import RenderMovieVodsCard from "../moviePageVodsCard.jsx"
import { useState } from "react"
import useKeydown from "../../../remote/useKeydown"
import { useNavigate } from "react-router-dom"
import { memo } from "react"
import RenderSettingsParentalCode from "../../settings/settingsParentalCode.jsx"
import { moviesLock, seriesLock } from "../../settings/settingsConfig.js"

function RenderMovieSearchVodsList ({ movies, onClose, type }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let [isIndex, setIsIndex] = useState(0)
    let [transIndex, setTransIndex] = useState(0)
    const [showLocked, setShowLocked] = useState(false)

    const lockedOnClose = () => {
        setShowLocked(false)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movies-search-list'
                }
            }
        )
    }

    const lockedCb = () => {
        setShowLocked(false)
        dispatch(
            {
                type: 'CHANGE_SELECTID_MOVIE',
                payload: {
                    movie: movies[isIndex]
                }
            }
        )
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movie-info-loading'
                }
            }
        )

        const stateData = {
            priviusControl: 'keyboard',
            type: type.type,
            id: movies[isIndex].stream_id || movies[isIndex].series_id,
            similar: movies
        }

        navigate('/vod_info', { state: stateData })
    }

    const cardClick = (data) => {
        if (moviesLock[data.category_id] || seriesLock[data.category_id]) {
            setShowLocked(true)
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-parental-keyboard'
                    }
                }
            )
            return
        }
        dispatch(
            {
                type: 'CHANGE_SELECTID_MOVIE',
                payload: {
                    movie: data
                }
            }
        )
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movie-info-loading'
                }
            }
        )

        const stateData = {
            priviusControl: 'keyboard',
            type: type.type,
            id: data.stream_id || data.series_id,
            similar: movies
        }

        navigate('/vod_info', { state: stateData })
    }

    let control = {
        isActive: currentControls == 'movies-search-list',

        ok: function (e) {
            cardClick(movies[isIndex])
        },

        left: function (e) {
            if (isIndex > 0) {
                if (transIndex !== 0) {
                    setTransIndex(transIndex -= 1)
                }
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {
            if (isIndex < movies.length - 1) {
                if (transIndex < movies.length - 5) {
                    setTransIndex(transIndex += 1)
                }
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'search-back'
                    }
                }
            )

        },

        down: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'keyboard'
                    }
                }
            )

        },

        back: () => {
            onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="movie-search-vods-list-box">

            <div style={{ transform: 'translateX(' + (- transIndex * 352) + 'px)' }} className="movie-search-vods-list-content-box">

                {movies.map((val, i) => {

                    return (
                        <RenderMovieVodsCard key={val.stream_id || val.series_id} data={val} isActive={control.isActive && isIndex == i} similar={movies} close={'keyboard'} type={type.type} index={i} />
                    )

                })}

            </div>

            {showLocked ? <RenderSettingsParentalCode cb={lockedCb} onClose={lockedOnClose} type={''} /> : false}

        </div>
    )
}

export default memo(RenderMovieSearchVodsList)