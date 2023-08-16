import { useDispatch, useSelector } from "react-redux"
import RenderLiveTvCategoriesCard from "./liveTvCategoriesCard.jsx"
import useKeydown from "../../remote/useKeydown.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { memo } from "react"
import { liveTvLock } from "../settings/settingsConfig.js"
import RenderSettingsParentalCode from "../settings/settingsParentalCode.jsx"

function RenderLiveTvCategories ({ category, changeCategory }) {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const [showLocked, setShowLocked] = useState(false)

    let [isIndex, setIsIndex] = useState(1)
    let [transIndex, setTransIndex] = useState(0)
    let [start, setStart] = useState(0)
    let [end, setEnd] = useState(30)
    const fixCategories = []

    const lockedOnClose = () => {
        setShowLocked(false)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'live-tv-categories'
                }
            }
        )
    }

    const lockedCb = () => {
        if (fixCategories[isIndex].channels.length) {
            setShowLocked(false)
            changeCategory(fixCategories[isIndex])
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'live-tv-channels'
                    }
                }
            )
        }
    }

    for (let i = start; i < end; i++) {
        if (category[i]) {
            category[i].index = i
            fixCategories.push(category[i])
        }
    }

    let control = {
        isActive: currentControls == 'live-tv-categories',

        ok: function (e) {
            dispatch(
                {
                    type: 'CHANGE_SELECTID_CHANNEL',
                    payload: {
                        channel: null
                    }
                }
            )

            if (liveTvLock[fixCategories[isIndex].category_id]) {
                console.log('locked')
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
            if (fixCategories[isIndex].channels.length) {
                changeCategory(fixCategories[isIndex])
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'live-tv-channels'
                        }
                    }
                )

            }

        },

        left: function (e) {

        },

        right: function (e) {
            dispatch(
                {
                    type: 'CHANGE_SELECTID_CHANNEL',
                    payload: {
                        channel: null
                    }
                }
            )

            if (liveTvLock[fixCategories[isIndex].category_id]) {
                console.log('locked')
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
            if (fixCategories[isIndex].channels.length) {
                changeCategory(fixCategories[isIndex])
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'live-tv-channels'
                        }
                    }
                )

            }
        },

        up: function (e) {
            if (isIndex > 0) {
                if (category.length > 30) {
                    if (isIndex < fixCategories.length - 4) {
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
                if (category.length > 30) {
                    if (isIndex > 4) {
                        if (transIndex < category.length - 10) {
                            setTransIndex(transIndex += 1)
                        }
                    }
                    setIsIndex(isIndex += 1)
                    if (isIndex > 15 && end < category.length) {
                        setIsIndex(15)
                        setStart(start += 1)
                        setEnd(end += 1)
                    }
                } else {
                    if (category.length > 10) {
                        if (transIndex < category.length - 10) {
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
            navigate('/menu')
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'menu-item'
                    }
                }
            )
        },


        green: () => {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'live-tv-categories'
                    }
                }
            )
        },

        blue: () => {
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
        <div style={{ width: control.isActive ? '50rem' : '8rem' }} className="live-tv-ctagory-box">

            <div style={{ transform: 'translateY(' + (- transIndex * 95) + 'px)' }} className="live-tv-category-content-box">

                {fixCategories.map((val, i) => {
                    return (
                        <RenderLiveTvCategoriesCard key={val.category_id} data={val} isActive={control.isActive && i == isIndex} index={val.index} />
                    )
                })}

            </div>

            {showLocked ? <RenderSettingsParentalCode onClose={lockedOnClose} cb={lockedCb} type={""} /> : false}

        </div>
    )
}

export default memo(RenderLiveTvCategories)