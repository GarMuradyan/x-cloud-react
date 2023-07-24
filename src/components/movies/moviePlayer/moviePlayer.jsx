import { memo } from "react"
import ReactPlayer from "react-player";
import RenderMoviePlayerControls from "./moviePlayerControls.jsx";
import useKeydown from "../../../remote/useKeydown.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import RenderLoadingBox from "../../loading.jsx";

function RenderMoviePlayerPage (props) {

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
            props.onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="movie-player-page-box">

            <video ref={videoRef} className="movie-player-video" src={props.src} controls={false} autoPlay={true} onPlaying={() => {
                console.log('play')
                setVideoControl(true)
                setShowControl(true)
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