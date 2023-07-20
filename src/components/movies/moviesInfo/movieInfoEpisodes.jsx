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

    const cardClick = (data) => {

        const playerData = {
            src: null,
            onClose: () => {
                setShowPlayer(false)
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
            cardClick(season[isIndex])
        },

        left: function (e) {

        },

        right: function (e) {

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

                <div className="movie-info-episodes-list-content-box">

                    {season.map((val, i) => {
                        return (
                            <RenderMovieInfoEpisodesCard key={i} data={val} type={type} isActive={control.isActive && isIndex == i} />
                        )
                    })}

                </div>

            </div>


            {showPlayer ? <Portal element={<RenderMoviePlayerPage {...playerInfo} />}></Portal> : false}

        </div>
    )
}

export default RenderMovieInfoEpisodes