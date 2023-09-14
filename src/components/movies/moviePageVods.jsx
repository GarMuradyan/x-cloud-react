import { useEffect, useMemo, useRef, useState } from "react";
import useKeydown from "../../remote/useKeydown";
import RenderMovieVodsCard from "./moviePageVodsCard.jsx"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import RenderSettingsParentalCode from "../settings/settingsParentalCode.jsx";
import { moviesLock, seriesLock } from "../settings/settingsConfig";

function RenderMovieVods ({ category, movies }) {

    console.log(movies)
    const contentRef = useRef(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const viewMoreArray = [];
    let quantArray = [];
    const fixCategories = []
    let [start, setStart] = useState(0)
    let [end, setEnd] = useState(10)
    const [showLocked, setShowLocked] = useState(false)
    let [isIndex, setIsIndex] = useState(0)
    let [isRowIndex, setIsRowIndex] = useState(0)
    let [transIndex, setTransIndex] = useState(0)

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
                category: viewMoreArray[i],
                id: i
            }
            fixCategories.push(obj)
        }
    }

    const lockedOnClose = () => {
        setShowLocked(false)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movies'
                }
            }
        )
    }

    const lockedCb = () => {
        setShowLocked(false)
        dispatch(
            {
                type: 'CHANGE_SELECTID_MOVIE',
                payload: {
                    movie: fixCategories[isRowIndex].category[isIndex]
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
            id: fixCategories[isRowIndex].category[isIndex].stream_id || fixCategories[isRowIndex].category[isIndex].series_id,
            similar: category
        }


        navigate('/vod_info', { state: stateData })

    }

    const cardClick = (data) => {
        if (movies.category_id == -1) {
            if (moviesLock[data.category_id] || seriesLock[data.category_id]) {
                setShowLocked(true)
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'settings-parental-keyboard'
                        }
                    }
                )
                return
            }
        }


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

        dispatch(
            {
                type: 'CHANGE_INFO_STATE',
                payload: {
                    infoPageState: false
                }
            }
        )


        navigate('/vod_info', { state: stateData })

    }

    useEffect(() => {
        setIsIndex(0)
        setIsRowIndex(0)
        setStart(0)
        setEnd(10)
        setTransIndex(0)
    }, [category])

    let control = useMemo(() => {
        return {
            isActive: currentControls == 'movies',

            ok: function (e) {
                cardClick(fixCategories[isRowIndex].category[isIndex])
            },

            left: function (e) {
                if (isIndex == 0) {
                    if (true) {
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

                if (isRowIndex > 0) {
                    if (viewMoreArray.length > 10) {
                        if (transIndex !== 0) {
                            setTransIndex(transIndex -= 1)
                        }
                        setIsRowIndex(isRowIndex -= 1)
                        if (isRowIndex < 5 && end !== 10) {
                            setIsRowIndex(5)
                            setStart(start -= 1)
                            setEnd(end -= 1)
                        }
                        console.log(isIndex)
                    } else {
                        if (viewMoreArray.length > 3) {
                            if (transIndex !== 0) {
                                setTransIndex(transIndex -= 1)
                            }
                            setIsRowIndex(isRowIndex -= 1)
                        } else {
                            setIsRowIndex(isRowIndex -= 1)
                            if (isRowIndex < viewMoreArray.length - 2) {
                                setTransIndex(transIndex -= 1)
                            }
                        }
                    }
                }
            },

            down: function (e) {
                if (isRowIndex < fixCategories.length - 1) {
                    if (viewMoreArray.length > 10) {
                        if (transIndex < viewMoreArray.length - 2) {
                            setTransIndex(transIndex += 1)
                        }
                        setIsRowIndex(isRowIndex += 1)
                        if (isRowIndex > 5 && end < viewMoreArray.length) {
                            setIsRowIndex(5)
                            setStart(start += 1)
                            setEnd(end += 1)
                        }
                        console.log(isIndex)
                    } else {
                        if (viewMoreArray.length > 3) {
                            if (transIndex < viewMoreArray.length - 2) {
                                setTransIndex(transIndex += 1)
                            }
                            setIsRowIndex(isRowIndex += 1)
                        } else {
                            setIsRowIndex(isRowIndex += 1)
                            if (viewMoreArray.length >= 3) {

                                if (isRowIndex > viewMoreArray.length - 2) {
                                    setTransIndex(transIndex += 1)
                                    console.log('trans')
                                }
                            }
                        }
                        console.log(isIndex)
                    }
                    if (!fixCategories[isRowIndex].category[isIndex]) {
                        setIsIndex(fixCategories[isRowIndex].category.length - 1)
                    }
                    console.log(viewMoreArray.length)
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
    })

    useKeydown(control)

    return (
        <div className="movie-vods-box">

            <div ref={contentRef} style={{ transform: 'translateY(' + (- transIndex * 460) + 'px)' }} className="movie-vods-content-box">

                {fixCategories.map((array, row) => {
                    return (
                        <div key={array.id} style={{ top: array.index * 460 + 'px' }} className="movie-vods-rows-box">

                            {array.category.map((val, i) => {

                                return (
                                    <RenderMovieVodsCard key={val.stream_id || val.series_id} data={val} isActive={isIndex == i && isRowIndex == row && control.isActive} similar={category} close={'movies'} type={location.pathname == '/movie' ? 'movie' : 'series'} index={i} />
                                )

                            })}

                        </div>
                    )
                })}

            </div>

            {showLocked ? <RenderSettingsParentalCode cb={lockedCb} onClose={lockedOnClose} type={""} /> : false}

        </div>
    )
}

export default memo(RenderMovieVods)