import { memo } from "react"
import RenderMoviePlayerControls from "./moviePlayerControls.jsx";
import useKeydown from "../../../remote/useKeydown.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import RenderLoadingBox from "../../loading.jsx";
import { useEffect } from "react";
import { moviesContinueWatching, seriesContinueWatching } from "../continueWatchingConfig.js";
import { events, playerEvents, sendPlayerEvent } from "../../../remote/socket.js";
import { socket } from "../../../App.js";
import { useLocation, useNavigate } from "react-router-dom";

function RenderMoviePlayerPage () {

    const videoRef = useRef(null)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const props = location.state

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const [videoControl, setVideoControl] = useState(false)
    const [showControl, setShowControl] = useState(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const onTimeUpdate = (video) => {
        setDuration(video.duration)
        setCurrentTime(video.currentTime)
    }

    const onPlayerEvent = (e) => {
        console.log(e)
        const video = document.getElementsByTagName("video")[0]
        switch (e.event) {
            case playerEvents.play: {
                console.log('PLAY-------------------')
                setVideoControl(true)
                setShowControl(true)
                video.play()
                break;
            }
            case playerEvents.pause: {
                console.log('PAUSE-------------------------')
                setShowControl(true)
                video.pause()
                break;
            }
            case playerEvents.loading: {
                console.log('LOADING START-----------------------')
                setVideoControl(false)
                video.pause()
                break;
            }
            case playerEvents.loadingFinished: {
                console.log('LOADING FINISHED-----------------------')
                setVideoControl(true)
                setShowControl(true)
                video.play()
                break;
            }
            case playerEvents.reaction: {
                break;
            }
            case playerEvents.videoContinue: {
                console.log(e)
                sendPlayerEvent(playerEvents.loading, {})
                sendPlayerEvent(playerEvents.seekTo, e.data)
                break
            }
        }
    }

    function addVideoEventListeners () {
        const video = document.getElementsByTagName("video")[0]

        if (!video) return;

        video.oncanplay = () => {
            console.log('oncanplay')
            sendPlayerEvent(playerEvents.loadingFinished, {})
        }

        video.onwaiting = () => {
            console.log('onwaiting')
            sendPlayerEvent(playerEvents.loading, {})
        }

        video.onended = () => {
            sendPlayerEvent(playerEvents.finished, {})
        }

        video.ontimeupdate = (e) => {
            sendPlayerEvent(playerEvents.timeUpdate, video.currentTime)
            onTimeUpdate(e.target)
        }

        video.onloadstart = () => {
            sendPlayerEvent(playerEvents.loading, {})
        }

        video.onloadedmetadata = (e) => {
            console.log('onloadedmetadata')
            sendPlayerEvent(playerEvents.loadingFinished, {})
        }

        video.onseeking = () => {
            console.log('onseeking')
            sendPlayerEvent(playerEvents.loading, {})
        }

        video.onseeked = () => {
            console.log('onseeked')
            sendPlayerEvent(playerEvents.loadingFinished, {})
        }

    }

    useEffect(() => {
        if (props.type == 'movie') {
            if (moviesContinueWatching[props.movie.stream_id]) {
                sendPlayerEvent(playerEvents.videoContinue, moviesContinueWatching[props.movie.stream_id].continue)
            }
        } else {
            if (seriesContinueWatching[props.movie.id]) {
                sendPlayerEvent(playerEvents.videoContinue, seriesContinueWatching[props.movie.id].continue)
            }
        }

        addVideoEventListeners()

        socket.on(events.playerEvent, onPlayerEvent)
    }, [])

    let control = {
        isActive: currentControls == 'movie-player',

        ok: function (e) {
            console.log('ok')
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
            console.log('right')
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
                }
            }
            navigate('/vod_info')
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

    useKeydown(control)

    return (
        <div className="movie-player-page-box">

            <video ref={videoRef} className="movie-player-video" onError={(event) => {
                console.log('video-src-error')
                console.log(event)
            }} src={props.src} autoPlay={true} controls={false} />

            <RenderMoviePlayerControls duration={duration} video={videoRef.current} changeCurrentTime={setCurrentTime} currenTime={currentTime} />

            {!videoControl ? <div className="video-loading-box"><RenderLoadingBox /></div> : false}

        </div>
    )
}


export default memo(RenderMoviePlayerPage)