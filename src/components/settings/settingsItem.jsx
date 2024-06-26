import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import { useState } from "react"
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import subtitleLogo from '../../images/subtitle.png'
import hideLogo from '../../images/hide.png'
import lockLogo from '../../images/lock.png'
import languageLogo from '../../images/language.png'
import logoutLogo from '../../images/logout.png'
import parentalLogo from '../../images/parental.png'
import RenderSettingsLogOut from "./settingsLogOut.jsx"
import RenderSettingsParentalCode from "./settingsParentalCode.jsx"
import req from "../requests/req"
import RenderSettingsLockCategories from "./settingsLockCategories.jsx"
import RenderInfoLoading from "../movies/moviesInfo/movieInfoLoading.jsx"
import RenderSettingsLanguage from "./settingsLanguage.jsx"
import words from "./words"


function RenderSettingsItem () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let [isIndex, setIsIndex] = useState(0)
    const [showLogOut, setShowLogOut] = useState(false)
    const [showParentalCode, setShowParentalCode] = useState(false)
    const [showLockCategories, setShowLockCategories] = useState(false)
    const [categories, setCategories] = useState(null)
    const [showLoading, setShowLoading] = useState(false)
    const [showLanguage, setShowLanguage] = useState(false)

    const settingsData = [
        {
            img: languageLogo,
            name: words[localStorage.getItem('language')].changeLanguage,
            onClick: function () {
                setShowLanguage(true)
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'settings-language-items'
                        }
                    }
                )
            }

        },
        {
            img: hideLogo,
            name: words[localStorage.getItem('language')].hideCategories,
            onClick: function () {
                console.log('hide-categories')
            }
        },
        {
            img: parentalLogo,
            name: words[localStorage.getItem('language')].changeParentalCode,
            onClick: function () {
                setShowParentalCode(true)
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'settings-parental-inputs'
                        }
                    }
                )
            }
        },
        {
            img: lockLogo,
            name: words[localStorage.getItem('language')].lockCategories,
            onClick: function () {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movie-info-loading'
                        }
                    }
                )
                setShowLoading(true)
                Promise.all([
                    req('http://xtream.in:9000/player_api.php?username=Aa6262699165AYR52&password=Aa52527965QGDS4256&type=m3u&action=get_live_categories', "GET", ''),
                    req('http://xtream.in:9000/player_api.php?username=Aa6262699165AYR52&password=Aa52527965QGDS4256&type=m3u&action=get_vod_categories', "GET", ''),
                    req('http://xtream.in:9000/player_api.php?username=Aa6262699165AYR52&password=Aa52527965QGDS4256&type=m3u&action=get_series_categories', "GET", '')
                ]).then((res) => {
                    console.log(res)
                    setCategories(res)
                    setShowLockCategories(true)
                    setShowLoading(false)
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'settings-lock-categories-back'
                            }
                        }
                    )
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        {
            img: logoutLogo,
            name: words[localStorage.getItem('language')].logOut,
            onClick: function () {
                setShowLogOut(true)
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'settings-log-out'
                        }
                    }
                )
            }
        },
    ]

    const parentalCb = () => {
        setShowParentalCode(false)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'settings-items'
                }
            }
        )
    }

    const onClose = () => {
        setShowParentalCode(false)
        setShowLockCategories(false)
        setShowLanguage(false)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'settings-items'
                }
            }
        )
    }

    let control = {
        isActive: currentControls == 'settings-items',

        ok: function (e) {
            settingsData[isIndex].onClick()
        },

        left: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-back'
                    }
                }
            )
        },

        right: function (e) {

        },

        up: function (e) {
            if (isIndex == 0) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'settings-back'
                        }
                    }
                )
            }

            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }

        },

        down: function (e) {
            if (isIndex < settingsData.length - 1) {
                setIsIndex(isIndex += 1)
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
        <div className="settings-items-box">

            {settingsData.map((val, i) => {
                return (
                    <div key={i} className={control.isActive && isIndex == i ? 'settings-item-box active' : 'settings-item-box'} onMouseMove={() => {
                        dispatch(
                            {
                                type: 'CHANGE_CONTROLS',
                                payload: {
                                    name: 'settings-items'
                                }
                            }
                        )
                        setIsIndex(i)
                    }} onClick={val.onClick}>

                        <img className="settings-item-img-box" src={val.img} />

                        <div className="settings-item-name-box">{val.name}</div>

                    </div>
                )
            })}

            {showLogOut ? <RenderSettingsLogOut onClose={setShowLogOut} /> : false}

            {showParentalCode ? <RenderSettingsParentalCode onClose={onClose} cb={parentalCb} type={'Change Pin'} /> : false}

            {showLoading ? <RenderInfoLoading /> : false}

            {showLockCategories ? <RenderSettingsLockCategories onClose={onClose} categories={categories} /> : false}

            {showLanguage ? <RenderSettingsLanguage onClose={onClose} /> : false}

        </div>
    )
}

export default memo(RenderSettingsItem)