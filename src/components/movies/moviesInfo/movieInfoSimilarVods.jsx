import { useDispatch, useSelector } from "react-redux"
import RenderMovieVodsCard from "../moviePageVodsCard.jsx"
import { useState } from "react"
import useKeydown from "../../../remote/useKeydown"
import { useNavigate } from "react-router-dom";
import { memo } from "react";

function RenderMovieInfoSimilarVods ({ similar, onClose, type, close }) {
    console.log('render-similar')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let [isIndex, setIsIndex] = useState(0)
    let [transIndex, setTransIndex] = useState(0)
    let [start, setStart] = useState(0)
    let [end, setEnd] = useState(15)
    const [isAnimated, setIsAnimated] = useState(true)
    const fixCategories = []

    for (let i = start; i < end; i++) {
        if (similar[i]) {
            similar[i].index = i
            fixCategories.push(similar[i])
        }
    }

    const cardClick = (data) => {
        dispatch(
            {
                type: 'CHANGE_SELECTID_MOVIE',
                payload: {
                    movie: data
                }
            }
        )
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movie-info-loading'
                }
            }
        )

        const stateData = {
            priviusControl: close,
            type: type,
            id: data.stream_id || data.series_id,
            similar: similar
        }

        navigate('/vod_info', { state: stateData })
    }

    let control = {
        isActive: currentControls == 'movie-info-similar',

        ok: function (e) {
            cardClick(fixCategories[isIndex])
        },

        left: function (e) {
            if (isIndex > 0) {
                if (similar.length > 15) {
                    if (isIndex < fixCategories.length - 1) {
                        if (transIndex !== 0) {
                            setTransIndex(transIndex -= 1)
                        }
                    }
                    setIsIndex(isIndex -= 1)
                    if (isIndex < 8 && end !== 15) {
                        setIsIndex(8)
                        setStart(start -= 1)
                        setEnd(end -= 1)
                    }
                    console.log(isIndex)
                } else {
                    if (similar.length > 5) {
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
                if (similar.length > 15) {
                    if (isIndex > 2) {
                        if (transIndex < similar.length - 5) {
                            setTransIndex(transIndex += 1)
                        }
                    }
                    setIsIndex(isIndex += 1)
                    if (isIndex > 8 && end < similar.length) {
                        setIsIndex(8)
                        setStart(start += 1)
                        setEnd(end += 1)
                    }
                    console.log(isIndex)
                } else {
                    if (similar.length > 5) {
                        if (transIndex < similar.length - 5) {
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
                        name: 'movie-info-buttons'
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
        <div className="movie-info-similar-vods-box">

            <div className="movie-info-similar-title">Similar Movies</div>

            <div className="movie-info-similar-list-box">

                <div style={{ transform: 'translateX(' + (- transIndex * 352) + 'px)' }} className="movie-info-similar-list-content-box">

                    {fixCategories.map((val, i) => {
                        return (
                            <RenderMovieVodsCard key={val.stream_id || val.series_id} data={val} isActive={control.isActive && isIndex == i} similar={similar} type={type} close={close} index={val.index} />
                        )
                    })}

                </div>

            </div>

        </div>
    )
}

export default memo(RenderMovieInfoSimilarVods)