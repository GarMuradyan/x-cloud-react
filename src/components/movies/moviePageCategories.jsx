import { useEffect, useMemo, useState } from "react";
import useKeydown from "../../remote/useKeydown";
import RenderMoviesCategoriesCard from "./moviePageCategoriesCard.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { memo } from "react";
import { moviesLock, seriesLock } from "../settings/settingsConfig";
import RenderSettingsParentalCode from "../settings/settingsParentalCode.jsx";

function RenderMovieCategories ({ category, setSelectidCategories }) {

    const navigate = useNavigate()
    const contentRef = useRef(null)
    let [isIndex, setIsIndex] = useState(0)
    let [start, setStart] = useState(0)
    let [end, setEnd] = useState(30)
    let [selectCateg, setSelectCateg] = useState(0)
    let [transIndex, setTransIndex] = useState(0)
    const [showLocked, setShowLocked] = useState(false)
    const [isAnimated, setIsAnimated] = useState(true)
    const fixCategories = []
    const currentControls = useSelector(function (state) {
        return state.currentControl
    })
    const dispatch = useDispatch()

    for (let i = start; i < end; i++) {
        if (category[i]) {
            category[i].index = i
            fixCategories.push(category[i])
        }
    }

    const lockedOnClose = () => {
        setShowLocked(false)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'category'
                }
            }
        )
    }

    const lockedCb = () => {
        setShowLocked(false)
        setSelectidCategories(selectCateg)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movies'
                }
            }
        )

        dispatch(
            {
                type: 'CHANGE_SELECTID_CATEGORY',
                payload: {
                    category: selectCateg
                }
            }
        )

        dispatch(
            {
                type: 'CHANGE_SELECTID_CATEGORY_ID',
                payload: {
                    categoryId: fixCategories[isIndex].category_id
                }
            }
        )
    }

    let control = useMemo(() => {
        return {
            isActive: currentControls == 'category',

            ok: function (e) {
                if (moviesLock[fixCategories[isIndex].category_id] || seriesLock[fixCategories[isIndex].category_id]) {
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
                console.log(category)
                setSelectidCategories(selectCateg)
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movies'
                        }
                    }
                )

                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CATEGORY',
                        payload: {
                            category: selectCateg
                        }
                    }
                )

                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CATEGORY_ID',
                        payload: {
                            categoryId: fixCategories[isIndex].category_id
                        }
                    }
                )
            },

            left: function (e) {

            },

            right: function (e) {
                if (moviesLock[fixCategories[isIndex].category_id] || seriesLock[fixCategories[isIndex].category_id]) {
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
                console.log(category)
                setSelectidCategories(selectCateg)
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movies'
                        }
                    }
                )

                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CATEGORY',
                        payload: {
                            category: selectCateg
                        }
                    }
                )

                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CATEGORY_ID',
                        payload: {
                            categoryId: fixCategories[isIndex].category_id
                        }
                    }
                )
            },

            up: function (e) {

                if (transIndex == 0 && isIndex == 0) {
                    setIsIndex(0)
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'search-button'
                            }
                        }
                    )
                    return
                }

                if (isIndex > 0) {
                    setSelectCateg(selectCateg -= 1)
                    if (category.length > 30) {
                        if (isIndex < fixCategories.length - 3) {
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
                        if (category.length > 10) {
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

            down: function (e) {
                if (isIndex < fixCategories.length - 1) {
                    setSelectCateg(selectCateg += 1)
                    if (category.length > 30) {
                        if (isIndex > 3) {
                            if (transIndex < category.length - 8) {
                                setTransIndex(transIndex += 1)
                            }
                        }
                        setIsIndex(isIndex += 1)
                        if (isIndex > 15 && end < category.length) {
                            setIsIndex(15)
                            setStart(start += 1)
                            setEnd(end += 1)
                        }
                        console.log(isIndex)
                    } else {
                        if (category.length > 8) {
                            if (transIndex < category.length - 8) {
                                setTransIndex(transIndex += 1)
                            }
                            setIsIndex(isIndex += 1)
                        } else {
                            setIsIndex(isIndex += 1)
                        }
                    }
                }
            },

            back: () => {
                if (isIndex > 5) {
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'search-button'
                            }
                        }
                    )
                } else {
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

        }
    })

    useKeydown(control)

    return (
        <div className="movie-categories-box">

            <div ref={contentRef} style={{ transform: 'translateY(' + (- transIndex * 112) + 'px)' }} className="movie-categories-content-box">

                {fixCategories.map((val, i) => {

                    return (
                        <RenderMoviesCategoriesCard key={val.category_id} data={val} isActive={isIndex == i && control.isActive} setSelectidCategories={setSelectidCategories} index={val.index} />
                    )

                })}

            </div>

            {showLocked ? <RenderSettingsParentalCode onClose={lockedOnClose} cb={lockedCb} type={""} /> : false}

        </div>
    )
}

export default memo(RenderMovieCategories)