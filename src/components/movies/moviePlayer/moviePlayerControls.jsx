import { useDispatch, useSelector } from "react-redux";
import useKeydown from "../../../remote/useKeydown";
import { useState } from "react";
import { useEffect } from "react";
import playLogo from '../../../images/play.png'
import pauseLogo from '../../../images/pause.png'

function RenderMoviePlayerControls ({ duration, video, changeCurrentTime, currenTime }) {
    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const [pause, setPause] = useState(false)
    const [delay, setDelay] = useState(null)
    let [videoCurrentTime, setVideoCurrentTime] = useState(0)
    const [currentTimeDelay, setCurrentTimeDelay] = useState(null)

    const formatTime = (time) => {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = Math.floor(time % 60);

        return hours + ':' + padZero(minutes) + ':' + padZero(seconds)
    }

    function padZero (number) {
        return number.toString().padStart(2, '0');
    }

    let control = {
        isActive: currentControls == 'video-controls',

        ok: function (e) {

            if (pause) {
                video.play()
                setPause(false)
            } else {
                video.pause()
                setPause(true)
            }

            control.changeControl()

        },

        left: function (e) {
            if (currenTime > 0) {
                if (currentTimeDelay) {
                    clearTimeout(currentTimeDelay)
                    setCurrentTimeDelay(null)
                }
                video.pause()
                control.changeControl()
                setVideoCurrentTime(videoCurrentTime -= 10)
                changeCurrentTime(currenTime -= 10)
                const timeoutId = setTimeout(() => {
                    video.currentTime = currenTime
                    video.play()
                }, 300);
                setCurrentTimeDelay(timeoutId)
            }
        },

        right: function (e) {
            if (currenTime < duration) {
                if (currentTimeDelay) {
                    clearTimeout(currentTimeDelay)
                    setCurrentTimeDelay(null)
                }
                video.pause()
                control.changeControl()
                setVideoCurrentTime(videoCurrentTime += 10)
                changeCurrentTime(currenTime += 10)
                const timeoutId = setTimeout(() => {
                    video.currentTime = currenTime
                    video.play()
                }, 300);
                setCurrentTimeDelay(timeoutId)
            }
        },

        up: function (e) {
            control.changeControl()

        },

        down: function (e) {
            control.changeControl()
        },

        back: () => {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'movie-player'
                    }
                }
            )
        },

        changeControl: () => {
            if (delay) {
                clearTimeout(delay)
                setDelay(null)
            }
            const timeoutId = setTimeout(() => {
                if (document.querySelector('.movie-player-page-box')) {
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'movie-player'
                            }
                        }
                    )
                }
            }, 5000);
            setDelay(timeoutId)
        }

    }

    useKeydown(control)

    return (
        <div style={{ transform: currentControls == 'video-controls' ? 'translateY(0px)' : false }} className="movie-player-controls-box">

            <img style={{ opacity: currentControls == 'video-controls' ? 1 : 0 }} className="video-play-pause-box" src={pause ? pauseLogo : playLogo} />

            <div className="movie-player-current-time-box">{formatTime(currenTime)}</div>

            <div className="movie-player-timeline-box">

                <div style={{ width: (currenTime / duration) * 100 + '%' }} className="movie-player-timeline-progres-box">

                    <div className="movie-player-timeline-progres-button"></div>

                </div>

            </div>

            <div className="movie-player-duration-box">{formatTime(duration)}</div>

        </div>
    )
}

export default RenderMoviePlayerControls