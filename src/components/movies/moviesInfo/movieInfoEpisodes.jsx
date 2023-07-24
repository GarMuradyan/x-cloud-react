import { useState } from "react"
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
    let [end, setEnd] = useState(5)
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
            }
        }
        console.log(data);
        playerData.src = `http://diblax.spartacus.site/series/WOYQyy5YzT/2WawEOAw0d/${ data.id }.${ data.container_extension }`
        console.log(playerData);
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

    let control = {
        isActive: currentControls == 'movie-info-episodes',

        ok: function (e) {
            cardClick(fixCategories[isIndex])
        },

        left: function (e) {
            if (isIndex > 0) {
                if (isAnimated) {
                    setIsIndex(isIndex -= 1)
                    if (isIndex < 2 && end !== 5) {
                        setTransIndex(transIndex -= 1)
                        setIsAnimated(false)
                        setTimeout(() => {
                            setIsAnimated(true)
                            setIsIndex(2)
                            setStart(start -= 1)
                            setEnd(end -= 1)
                        }, 100);
                    } else {
                        if (isIndex > 1) {
                            setTransIndex(transIndex -= 1)
                        }
                    }
                }
            }
        },

        right: function (e) {

            if (isIndex < fixCategories.length - 1) {
                if (isAnimated) {
                    setIsIndex(isIndex += 1)
                    if (isIndex > 2 && end < season.length) {
                        setTransIndex(transIndex += 1)
                        setIsAnimated(false)
                        console.log(isAnimated);
                        setTimeout(() => {
                            setIsAnimated(true)
                            console.log(isAnimated);
                            setIsIndex(2)
                            setStart(start += 1)
                            setEnd(end += 1)
                        }, 100);
                    } else {
                        if (isIndex > 2) {
                            setTransIndex(transIndex += 1)
                        }
                    }
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
                            <RenderMovieInfoEpisodesCard key={i} data={val} type={type} isActive={control.isActive && isIndex == i} index={val.index} />
                        )
                    })}

                </div>

            </div>


            {showPlayer ? <Portal element={<RenderMoviePlayerPage {...playerInfo} />}></Portal> : false}

        </div>
    )
}

export default RenderMovieInfoEpisodes