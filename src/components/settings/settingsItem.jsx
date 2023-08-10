import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import { useState } from "react"
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import subtitleLogo from '../../images/subtitle.png'
import XtreamLogo from '../../images/Xtream.png'
import lockLogo from '../../images/lock.png'
import languageLogo from '../../images/language.png'
import logoutLogo from '../../images/logout.png'
import parentalLogo from '../../images/parental.png'
import RenderSettingsLogOut from "./settingsLogOut.jsx"
import RenderSettingsParentalCode from "./settingsParentalCode.jsx"

function RenderSettingsItem () {

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const navigate = useNavigate()

    const dispatch = useDispatch()

    let [isIndex, setIsIndex] = useState(0)

    const [showLogOut, setShowLogOut] = useState(false)

    const [showParentalCode, setShowParentalCode] = useState(false)

    const settingsData = [
        {
            img: languageLogo,
            name: 'Change Language',
            onClick: function () {
            }

        },
        {
            img: XtreamLogo,
            name: 'Use XTREAM code EPG',
            type: 'check',
            onClick: function () {

            }
        },
        {
            img: 'https://png.pngtree.com/png-clipart/20190920/original/pngtree-white-search-icon-png-image_4627638.jpg',
            name: 'Use TMDB api',
            type: 'check',
            onClick: function () {

            }
        },
        {
            img: subtitleLogo,
            name: 'Remove Subtitle Background',
            type: 'check',
            onClick: function () {

            }
        },
        {
            img: parentalLogo,
            name: 'Change parental code',
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
            name: 'Lock Categories',
            onClick: function () {

            }
        },
        {
            img: logoutLogo,
            name: 'Log Out',
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

    const parentalOnClose = () => {
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
                    <div key={i} className={control.isActive && isIndex == i ? 'settings-item-box active' : 'settings-item-box'}>

                        <img className="settings-item-img-box" src={val.img} />

                        <div className="settings-item-name-box">{val.name}</div>

                        {val.type ? <div className="settigs-item-check-box">

                            <div className="check-button-box"></div>

                        </div> : false}

                    </div>
                )
            })}

            {showLogOut ? <RenderSettingsLogOut onClose={setShowLogOut} /> : false}

            {showParentalCode ? <RenderSettingsParentalCode onClose={parentalOnClose} cb={parentalCb} /> : false}

        </div>
    )
}

export default memo(RenderSettingsItem)