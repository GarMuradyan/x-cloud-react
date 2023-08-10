import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../../remote/useKeydown"
import { memo } from "react";

function RenderMovieInfoSeasonButtons ({ onClose, seasons, setSelectidSeason }) {

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let [isIndex, setIsIndex] = useState(0)
    let [selectid, setSelectid] = useState(0)

    const seasonButtonClick = (number) => {
        setSelectidSeason(number)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movie-info-episodes'
                }
            }
        )
    }

    let control = {
        isActive: currentControls == 'movie-info-seasons-button',

        ok: function (e) {
            seasonButtonClick(isIndex)
            setSelectid(isIndex)
        },

        left: function (e) {
            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {
            if (isIndex < seasons.length - 1) {
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'movie-info-buttons'
                    }
                }
            )

        },

        down: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'movie-info-episodes'
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
        <div className="movie-info-seasons-buttons">

            <div style={{ transform: 'translateX(' + (- isIndex * 237) + 'px)' }} className="movie-info-seasons-buttons-content">

                {seasons.map((val, i) => {
                    return (
                        <div key={i} style={{ backgroundColor: i == selectid ? 'white' : 'rgba(30, 31, 32, 0.45)', color: i == selectid ? 'black' : 'white', }} className={control.isActive && isIndex == i ? "movie-info-seasons-button active" : "movie-info-seasons-button"} onClick={() => {
                            seasonButtonClick(i + 1)
                        }}>{`Season ${ i + 1 }`}</div>
                    )
                })}

            </div>

        </div>
    )
}

export default memo(RenderMovieInfoSeasonButtons) 