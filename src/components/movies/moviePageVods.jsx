import { useRef, useState } from "react";
import useKeydown from "../../remote/useKeydown";
import RenderMovieVodsCard from "./moviePageVodsCard.jsx"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";

function RenderMovieVods ({ category }) {

    const viewMoreArray = [];

    let quantArray = [];
    const fixCategories = []
    let [start, setStart] = useState(0)
    let [end, setEnd] = useState(5)
    const contentRef = useRef(null)

    for (let i = 0; i < category.length; i++) {
        const elem = category[i];
        quantArray.push(elem);
        if (quantArray.length === 4) {
            viewMoreArray.push(quantArray);
            quantArray = [];
        } else if (i === category.length - 1 && quantArray.length < 4) {
            viewMoreArray.push(quantArray);
            quantArray = [];
        }
    }

    for (let i = start; i < end; i++) {
        if (viewMoreArray[i]) {
            const obj = {
                index: i,
                category: viewMoreArray[i]
            }
            fixCategories.push(obj)
        }
    }


    let [isIndex, setIsIndex] = useState(0)
    let [isRowIndex, setIsRowIndex] = useState(0)
    let [transIndex, setTransIndex] = useState(0)
    const [isAnimated, setIsAnimated] = useState(true)
    const navigate = useNavigate()
    const currentControls = useSelector(function (state) {
        return state.currentControl
    })
    const dispatch = useDispatch()
    const location = useLocation()

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
            priviusControl: 'movies',
            type: location.pathname == '/movie' ? 'movie' : 'series',
            id: data.stream_id || data.series_id,
            similar: category
        }


        navigate('/vod_info', { state: stateData })

    }

    let control = {
        isActive: currentControls == 'movies',

        ok: function (e) {
            cardClick(fixCategories[isRowIndex].category[isIndex])
        },

        left: function (e) {
            if (isIndex == 0) {
                if (isAnimated) {
                    setIsIndex(0)
                    setIsRowIndex(0)
                    setStart(0)
                    setEnd(5)
                    setTransIndex(0)
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'category'
                            }
                        }
                    )
                }
            }

            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {
            if (isIndex < fixCategories[isRowIndex].category.length - 1) {
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {
            if (isRowIndex >= 0 && end !== 5) {
                if (isAnimated) {
                    setIsRowIndex(isRowIndex -= 1)

                    if (isRowIndex < 0 && end !== 5) {
                        setTransIndex(transIndex -= 1)
                        setIsAnimated(false)
                        setIsRowIndex(0)
                        setStart(start -= 1)
                        setEnd(end -= 1)
                        setTimeout(() => {
                            setIsAnimated(true)
                        }, 100);
                    } else {
                        setTransIndex(transIndex -= 1)
                    }

                    setIsIndex(0)
                }

            }

        },

        down: function (e) {
            if (isRowIndex < fixCategories.length - 1) {
                if (isAnimated) {
                    setIsRowIndex(isRowIndex += 1)

                    if (isRowIndex > 0 && end < viewMoreArray.length) {
                        setTransIndex(transIndex += 1)
                        setIsAnimated(false)
                        setIsRowIndex(0)
                        setTimeout(() => {
                            setStart(start += 1)
                            setEnd(end += 1)
                            setIsAnimated(true)
                        }, 100);
                    } else {
                        setTransIndex(transIndex += 1)
                    }

                    setIsIndex(0)
                }
            }

        },

        back: () => {
            navigate('/menu')
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'menu-item'
                    }
                }
            )
        }
    }

    useKeydown(control)

    return (
        <div className="movie-vods-box">

            <div ref={contentRef} style={{ transform: 'translateY(' + (- transIndex * 460) + 'px)' }} className="movie-vods-content-box">

                {fixCategories.map((array, row) => {
                    return (
                        <div key={row} style={{ top: array.index * 460 + 'px' }} className="movie-vods-rows-box">

                            {array.category.map((val, i) => {

                                return (
                                    <RenderMovieVodsCard key={i} data={val} isActive={isIndex == i && isRowIndex == row && control.isActive} similar={category} close={'movies'} type={location.pathname == '/movie' ? 'movie' : 'series'} index={i} />
                                )

                            })}

                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default memo(RenderMovieVods)