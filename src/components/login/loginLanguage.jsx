import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import armenianLogo from '../../images/armenian.png'
import englishLogo from '../../images/english.png'
import portugalLogo from '../../images/portugal.png'
import selectidLogo from '../../images/selectid.png'
import russianLogo from '../../images/russian.png'
import { useState } from "react"
import RenderSettingsLanguage from "../settings/settingsLanguage.jsx"

function RenderLoginLanguage ({ }) {

    const languagesArr = [
        {
            name: 'English',
            type: 'eng',
            img: englishLogo,
            id: 0
        },
        {
            name: 'Armenian',
            type: 'arm',
            img: armenianLogo,
            id: 1
        },
        {
            name: 'Russian',
            type: 'russian',
            img: russianLogo,
            id: 2
        },
        {
            name: 'Portuguese',
            type: 'portuguese',
            img: portugalLogo,
            id: 3
        },
        {
            name: 'Spanish',
            type: 'spanish',
            img: null,
            id: 4
        },
        {
            name: 'Japanese',
            type: 'japanese',
            img: null,
            id: 5
        }
    ]

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const [showLanguage, setShowLanguage] = useState(false)

    const dispatch = useDispatch()

    const onClose = () => {
        setShowLanguage(false)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'login-language'
                }
            }
        )
    }

    let control = {
        isActive: currentControls == 'login-language',

        ok: function (e) {
            setShowLanguage(true)
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-language-items'
                    }
                }
            )
        },

        left: function (e) {

        },

        right: function (e) {

        },

        up: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'login-items'
                    }
                }
            )
        },

        down: function (e) {

        }


    }

    useKeydown(control)
    return (
        <>

            {languagesArr.map((val, i) => {
                return (
                    val.type == localStorage.getItem('language') ? <div key={val.id} className={control.isActive ? "login-language-box active" : "login-language-box"}>
                        <div className="login-language-name-box">{val.name}</div>
                        <img src={val.img} className="login-language-img-box" />
                    </div> : false
                )
            })}

            {showLanguage ? <RenderSettingsLanguage onClose={onClose} /> : false}

        </>
    )
}

export default RenderLoginLanguage