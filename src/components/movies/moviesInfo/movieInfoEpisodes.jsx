import { useEffect, useState } from "react"
import RenderMovieInfoEpisodesCard from "./movieInfoEpisodesCard.jsx"
import useKeydown from "../../../remote/useKeydown.js"
import { useDispatch, useSelector } from "react-redux"
import Portal from "../../portal.jsx"
import RenderMoviePlayerPage from '../moviePlayer/moviePlayer.jsx'
import words from "../../settings/words.js"
import { events, onPlayerEvent, playerEvents, sendPlayerEvent } from "../../../remote/socket.js"
import { socket } from "../../../App.js"
import { useLocation, useNavigate } from "react-router-dom"

function RenderMovieInfoEpisodes ({ season, type, onClose, infoPageState }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    console.log(season)

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })
    const selectidMovie = useSelector(function (state) {
        return state.selectidMovie
    })

    let [isIndex, setIsIndex] = useState(0)
    let [transIndex, setTransIndex] = useState(0)
    let [start, setStart] = useState(0)
    let [end, setEnd] = useState(30)
    const fixCategories = []

    for (let i = start; i < end; i++) {
        if (season[i]) {
            season[i].index = i
            fixCategories.push(season[i])
        }
    }

    const cardClick = (data) => {
        console.log('episode-click')

        const playerData = {
            src: null,
            movie: data,
            type: type
        }
        playerData.src = `http://xtream.in:9000/series/Aa6262699165AYR52/Aa52527965QGDS4256/${ data.id }.${ data.container_extension }`

        sendPlayerEvent(playerEvents.setupDataSource, { playerInfo: playerData, infoPageState: infoPageState, selectidMovie: selectidMovie })
    }

    useEffect(() => {
        setTransIndex(0)
        setIsIndex(0)
        setEnd(30)
        setStart(0)
    }, [season])

    let control = {
        isActive: currentControls == 'movie-info-episodes',

        ok: function (e) {
            cardClick(fixCategories[isIndex])
        },

        left: function (e) {
            if (isIndex > 0) {
                if (season.length > 30) {
                    if (isIndex < fixCategories.length) {
                        if (transIndex !== 0) {
                            setTransIndex(transIndex -= 1)
                        }
                    }
                    setIsIndex(isIndex -= 1)
                    if (isIndex < 15 && end !== 30) {
                        setIsIndex(15)
                        setStart(start -= 1)
                        setEnd(end -= 1)
                    }
                    console.log(isIndex)
                } else {
                    if (season.length > 3) {
                        if (transIndex !== 0) {
                            setTransIndex(transIndex -= 1)
                        }
                        setIsIndex(isIndex -= 1)
                    } else {
                        setIsIndex(isIndex -= 1)
                    }
                }

            }
        },

        right: function (e) {
            if (isIndex < fixCategories.length - 1) {
                if (season.length > 30) {
                    console.log('render')
                    if (isIndex > 1) {
                        if (transIndex < season.length - 3) {
                            setTransIndex(transIndex += 1)
                        }
                    }
                    setIsIndex(isIndex += 1)
                    if (isIndex > 15 && end < season.length) {
                        setIsIndex(15)
                        setStart(start += 1)
                        setEnd(end += 1)
                    }
                    console.log(isIndex)
                } else {
                    console.log('translate')
                    console.log(season.length)
                    if (season.length > 3) {
                        if (transIndex < season.length - 3) {
                            setTransIndex(transIndex += 1)
                        }
                        setIsIndex(isIndex += 1)
                    } else {
                        setIsIndex(isIndex += 1)
                    }
                    console.log(isIndex)
                }

            }
        },

        up: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'movie-info-seasons-button'
                    }
                }
            )

        },

        down: function (e) {


        },

        back: () => {
            onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="movie-info-episodes-box">

            <div className="movie-info-episodes-title">{words[localStorage.getItem('language')].episodes + " " + season.length}</div>

            <div className="movie-info-episodes-list-box">

                <div style={{ transform: 'translateX(' + (- transIndex * 530) + 'px)' }} className="movie-info-episodes-list-content-box">

                    {fixCategories.map((val, i) => {
                        return (
                            <RenderMovieInfoEpisodesCard key={val.id} data={val} type={type} isActive={control.isActive && isIndex == i} index={val.index} />
                        )
                    })}

                </div>

            </div>

        </div>
    )
}

export default RenderMovieInfoEpisodes