import { useEffect, useRef, useState } from "react"
import notFound from "../../images/notFound.png"
import favorit from "../../images/favorit.png"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { memo } from "react"
import ResizeImage from "../imgResizer/ResizeImage"
import lockPng from '../../images/lock.png'
import { moviesLock, seriesLock } from "../settings/settingsConfig"

function RenderMovieVodsCard ({ data, isActive, similar, close, type, index }) {

    const navigate = useNavigate()

    const imageRef = useRef(null)

    let originalSrc = data.cover || data.stream_icon
    const poster = originalSrc ? `https://image.tmdb.org/t/p/w200/${ originalSrc.split("/").pop() }` : notFound
    let favorits = null
    let continueWatching = {}

    if (type == 'movie') {
        favorits = localStorage.getItem('movies-favorit') ? JSON.parse(localStorage.getItem('movies-favorit')) : {}
        continueWatching = localStorage.getItem('movies-continue') ? JSON.parse(localStorage.getItem('movies-continue')) : {}
    } else {
        favorits = localStorage.getItem('series-favorit') ? JSON.parse(localStorage.getItem('series-favorit')) : {}
    }

    const dispatch = useDispatch()

    const cardClick = (e) => {

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
            priviusControl: close,
            type: type,
            id: data.stream_id || data.series_id,
            similar: similar
        }

        dispatch(
            {
                type: 'CHANGE_INFO_STATE',
                payload: {
                    infoPageState: false
                }
            }
        )

        navigate('/vod_info', { state: stateData })

    }

    useEffect(() => {
        setTimeout(() => {
            if (imageRef.current) {
                imageRef.current.style.opacity = '1'
            }
        }, 100);
    }, [data])

    return (
        <div onClick={cardClick} style={{ left: index * 352 + 'px' }} className={isActive ? "movie-vods-card-box active" : "movie-vods-card-box"}>

            <img ref={imageRef} className="movie-vods-card-poster" src={poster || notFound} placeholder="blur" onError={(e) => {
                e.target.src = notFound
            }} />

            {/* <ResizeImage src={data.cover || data.stream_icon || notFound} /> */}

            <p style={{ opacity: isActive ? '0' : '1' }} className="movie-vods-card-name">{data.name}</p>

            <div style={{ opacity: isActive ? '0' : '1' }} className="movie-vods-card-gradient"></div>

            {favorits[data.stream_id || data.series_id] ? <img className="movie-vods-card-favorit" src={favorit} /> : false}

            {continueWatching[data.stream_id] && continueWatching[data.stream_id].progresBar ? <div className="movie-vods-card-progres">
                <div style={{ width: continueWatching[data.stream_id].progresBar }} className="movie-vods-card-progresbar-box"></div>
            </div> : false}

            {moviesLock[data.category_id] || seriesLock[data.category_id] ? <img src={lockPng} className="movie-vods-card-poster-box" /> : false}

        </div>
    )
}

export default memo(RenderMovieVodsCard)