import { memo } from "react"
import RenderMoviePlayerControls from "./moviePlayerControls.jsx";
import useKeydown from "../../../remote/useKeydown.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import RenderLoadingBox from "../../loading.jsx";
import { useEffect } from "react";
import { moviesContinueWatching, seriesContinueWatching } from "../continueWatchingConfig.js";

function RenderMoviePlayerPage (props) {

    console.log(props)

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const [videoControl, setVideoControl] = useState(false)
    const [showControl, setShowControl] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const videoRef = useRef(null)

    const onTimeUpdate = (video) => {
        setDuration(video.duration)
        setCurrentTime(video.currentTime)
    }

    useEffect(() => {
        if (props.type == 'movie') {
            if (moviesContinueWatching[props.movie.stream_id]) {
                console.log('kaaaaaaa')
                videoRef.current.currentTime = moviesContinueWatching[props.movie.stream_id].continue
            }
        } else {
            if (seriesContinueWatching[props.movie.id]) {
                console.log('kaaaaaaaaa')
                videoRef.current.currentTime = seriesContinueWatching[props.movie.id].continue
            }
            console.log('series')
        }
    }, [])

    let control = {
        isActive: currentControls == 'movie-player',

        ok: function (e) {
            if (showControl) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'video-controls'
                        }
                    }
                )
            }
        },

        left: function (e) {
            if (showControl) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'video-controls'
                        }
                    }
                )
            }
        },

        right: function (e) {
            if (showControl) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'video-controls'
                        }
                    }
                )
            }
        },

        up: function (e) {
            if (showControl) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'video-controls'
                        }
                    }
                )
            }

        },

        down: function (e) {
            if (showControl) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'video-controls'
                        }
                    }
                )
            }

        },

        back: () => {
            if (duration) {
                if (props.type == 'movie') {
                    if (moviesContinueWatching[props.movie.stream_id]) {
                        moviesContinueWatching[props.movie.stream_id].continue = currentTime == duration ? 0 : currentTime
                        moviesContinueWatching[props.movie.stream_id].progresBar = currentTime == duration ? 0 : (currentTime / duration) * 100 + '%'
                    } else {
                        moviesContinueWatching[props.movie.stream_id] = currentTime == duration ? { continue: 0, progresBar: 0 } : { continue: currentTime, progresBar: (currentTime / duration) * 100 + '%' }
                    }

                    if (moviesContinueWatching[props.movie.stream_id].continue == 0) {
                        delete moviesContinueWatching[props.movie.stream_id]
                    }
                    localStorage.setItem('movies-continue', JSON.stringify(moviesContinueWatching))
                } else {
                    if (seriesContinueWatching[props.movie.id]) {
                        seriesContinueWatching[props.movie.id].continue = currentTime == duration ? 0 : currentTime
                        seriesContinueWatching[props.movie.id].progresBar = currentTime == duration ? 0 : (currentTime / duration) * 100 + '%'
                    } else {
                        seriesContinueWatching[props.movie.id] = currentTime == duration ? { continue: 0, progresBar: 0 } : { continue: currentTime, progresBar: (currentTime / duration) * 100 + '%' }
                    }

                    if (seriesContinueWatching[props.movie.id].continue == 0) {
                        delete seriesContinueWatching[props.movie.id]
                    }
                    localStorage.setItem('series-continue', JSON.stringify(seriesContinueWatching))
                    console.log('series')
                }
            }
            props.onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="movie-player-page-box">

            <video ref={videoRef} className="movie-player-video" onError={(event) => {
                console.log('video-src-error')
                console.log(event)
            }} src={props.src} autoPlay={true} controls={false} onPlaying={() => {
                setVideoControl(true)
                setShowControl(true)
                console.log('video-play')
            }} onTimeUpdate={(e) => {
                onTimeUpdate(e.target)
            }} onWaiting={() => {
                setVideoControl(false)
            }} />

            <RenderMoviePlayerControls duration={duration} video={videoRef.current} changeCurrentTime={setCurrentTime} currenTime={currentTime} />

            {!videoControl ? <div className="video-loading-box"><RenderLoadingBox /></div> : false}

        </div>
    )
}


export default memo(RenderMoviePlayerPage)