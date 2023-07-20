import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../../remote/useKeydown"

function RenderMovieInfoContent ({ data, onClose, type }) {

    const buttonsInfo = [{ name: 'Play', type: "play" }, { name: 'Watch trailer', type: "trailer" }]

    const selectidMovie = useSelector(function (state) {
        return state.selectidMovie
    })

    const buttonsClick = (val) => {
        if (val.type == 'play') {
            if (type == 'movie') {
                console.log(selectidMovie);
            }
        }
    }

    let [isIndex, setIsIndex] = useState(0)
    const dispatch = useDispatch()
    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let control = {
        isActive: currentControls == 'movie-info-buttons',

        ok: function (e) {
            buttonsClick(buttonsInfo[isIndex])
        },

        left: function (e) {
            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {
            if (isIndex < buttonsInfo.length - 1) {
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'movie-info-back'
                    }
                }
            )
        },

        down: function (e) {
            if (type == 'series') {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movie-info-seasons-button'
                        }
                    }
                )
            } else {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movie-info-similar'
                        }
                    }
                )
            }

        },

        back: () => {
            onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="movie-info-content-box" >

            <div className="movie-info-content-name-box">{data.info.name || data.movie_data.name}</div>

            <div className="movie-info-content-desc-box">{data.info.plot || data.info.description}</div>

            <div className="movie-info-content-buttons-box">

                {buttonsInfo.map((val, i) => {

                    return (
                        <div key={i} className={control.isActive && isIndex == i ? "movie-info-content-button-box active" : "movie-info-content-button-box"} onClick={() => {

                            buttonsClick(val)

                        }}>{val.name}</div>
                    )

                })}

            </div>

        </div>
    )
}

export default RenderMovieInfoContent