import { useEffect, useState } from "react"
import RenderMovieInfoEpisodesCard from "./movieInfoEpisodesCard.jsx"
import useKeydown from "../../../remote/useKeydown.js"
import { useDispatch, useSelector } from "react-redux"
import Portal from "../../portal.jsx"
import RenderMoviePlayerPage from '../moviePlayer/moviePlayer.jsx'

function RenderMovieInfoEpisodes ({ season, type, onClose }) {

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const [showPlayer, setShowPlayer] = useState(false)
    const [playerInfo, setPLayerInfo] = useState(false)

    let [isIndex, setIsIndex] = useState(0)
    let [transIndex, setTransIndex] = useState(0)
    let [start, setStart] = useState(0)
    let [end, setEnd] = useState(30)
    const [isAnimated, setIsAnimated] = useState(true)
    const fixCategories = []

    for (let i = start; i < end; i++) {
        if (season[i]) {
            season[i].index = i
            fixCategories.push(season[i])
        }
    }

    const cardClick = (data) => {

        const playerData = {
            src: null,
            onClose: () => {
                setShowPlayer(false)
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movie-info-episodes'
                        }
                    }
                )
            },
            movie: data,
            type: type
        }
        playerData.src = `https://globoplay.one/series/2452366/8950273/${ data.id }.${ data.container_extension }`
        setPLayerInfo(playerData)

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

            <div className="movie-info-episodes-title">Epizodes</div>

            <div className="movie-info-episodes-list-box">

                <div style={{ transform: 'translateX(' + (- transIndex * 530) + 'px)' }} className="movie-info-episodes-list-content-box">

                    {fixCategories.map((val, i) => {
                        return (
                            <RenderMovieInfoEpisodesCard key={val.id} data={val} type={type} isActive={control.isActive && isIndex == i} index={val.index} />
                        )
                    })}

                </div>

            </div>


            {showPlayer ? <Portal element={<RenderMoviePlayerPage {...playerInfo} />}></Portal> : false}

        </div>
    )
}

export default RenderMovieInfoEpisodes