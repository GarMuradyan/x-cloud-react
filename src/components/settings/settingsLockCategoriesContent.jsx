import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import { useState } from "react"
import { liveTvLock, moviesLock, seriesLock } from "./settingsConfig"
import lockPng from "../../images/lock.png"
import words from "./words"

function RenderSettingsLockCategoriesContent ({ onClose, lockCateg }) {

    const dispatch = useDispatch()

    const names = [words[localStorage.getItem('language')].liveCategories, words[localStorage.getItem('language')].movieCategories, words[localStorage.getItem('language')].seriesCategories]

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const [categories, setCategories] = useState(lockCateg)

    const lockClick = (data) => {
        if (isRowIndex == 0) {
            if (liveTvLock[data.category_id]) {
                delete liveTvLock[data.category_id]

            } else {
                liveTvLock[data.category_id] = true
            }
            localStorage.setItem('live-tv-lock', JSON.stringify(liveTvLock))
        }
        if (isRowIndex == 1) {
            if (moviesLock[data.category_id]) {
                delete moviesLock[data.category_id]

            } else {
                moviesLock[data.category_id] = true
            }
            localStorage.setItem('movies-lock', JSON.stringify(moviesLock))
        }
        if (isRowIndex == 2) {
            if (seriesLock[data.category_id]) {
                delete seriesLock[data.category_id]

            } else {
                seriesLock[data.category_id] = true
            }
            localStorage.setItem('series-lock', JSON.stringify(seriesLock))
        }
        setCategories([...lockCateg])
    }

    let [isIndex, setIsIndex] = useState(0)
    let [isRowIndex, setIsRowIndex] = useState(0)
    let [transIndex, setTransIndex] = useState(0)

    let control = {
        isActive: currentControls == 'settings-lock-categories-items',

        ok: function (e) {
            lockClick(categories[isRowIndex][isIndex])
        },

        left: function (e) {
            if (isRowIndex > 0) {
                setIsRowIndex(isRowIndex -= 1)
                setIsIndex(0)
                setTransIndex(0)
            }
        },

        right: function (e) {
            if (isRowIndex < categories.length - 1) {
                setIsRowIndex(isRowIndex += 1)
                setIsIndex(0)
                setTransIndex(0)
            }

        },

        up: function (e) {

            if (isIndex == 0) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'settings-lock-categories-back'
                        }
                    }
                )
            }

            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
                setTransIndex(transIndex -= 1)
            }

        },

        down: function (e) {
            if (isIndex < categories[isRowIndex].length - 1) {
                setIsIndex(isIndex += 1)
                setTransIndex(transIndex += 1)
            }
        },

        back: () => {
            onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="settings-lock-categories-content-box">

            {categories.map((categ, index) => {
                return (
                    <div key={index} className="lock-categories-row-box">

                        <div className="lock-categories-row-title-box">{names[index]}</div>

                        <div className="lock-categories-row-list-box">

                            <div style={{ transform: isRowIndex == index ? `translateY(${ -transIndex * 108 + 'px' })` : false }} className="lock-categories-row-list-content-box">

                                {categ.map((val, i) => {
                                    return (
                                        <div key={val.category_id} className={control.isActive && index == isRowIndex && i == isIndex ? "lock-categories-row-item-box active" : "lock-categories-row-item-box"} onMouseMove={() => {
                                            dispatch(
                                                {
                                                    type: 'CHANGE_CONTROLS',
                                                    payload: {
                                                        name: 'settings-lock-categories-items'
                                                    }
                                                }
                                            )
                                            setIsIndex(i)
                                            setIsRowIndex(index)
                                            setTransIndex(i)
                                        }} onClick={() => {
                                            lockClick(categories[isRowIndex][isIndex])
                                        }}>

                                            <div className="lock-categories-row-item-name-box">{val.category_name}</div>

                                            {liveTvLock[val.category_id] || moviesLock[val.category_id] || seriesLock[val.category_id] ? <img className="lock-categories-row-item-lock-box" src={lockPng} /> : false}

                                        </div>
                                    )
                                })}

                            </div>

                        </div>

                    </div>
                )
            })}

        </div>
    )
}

export default RenderSettingsLockCategoriesContent