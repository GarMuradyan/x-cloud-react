import { useState } from 'react'
import armenianLogo from '../../images/armenian.png'
import englishLogo from '../../images/english.png'
import portugalLogo from '../../images/portugal.png'
import selectidLogo from '../../images/selectid.png'
import russianLogo from '../../images/russian.png'
import japanseLogo from '../../images/japanse.jpeg'
import spanishLogo from '../../images/spanish.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import useKeydown from '../../remote/useKeydown'

function RenderSettingsLanguageContent ({ onClose }) {

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

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
            img: spanishLogo,
            id: 4
        },
        {
            name: 'Japanese',
            type: 'japanese',
            img: japanseLogo,
            id: 5
        }
    ]

    let [isIndex, setIsIndex] = useState(0)
    const [languages, setLanguages] = useState(languagesArr)

    let control = {
        isActive: currentControls == 'settings-language-items',

        ok: function (e) {
            localStorage.setItem('language', languages[isIndex].type)
            setLanguages([...languagesArr])
        },

        left: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-language-back'
                    }
                }
            )
        },

        right: function (e) {
        },

        up: function (e) {
            if (isIndex == 0) {
                control.left()
            }

            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }

        },

        down: function (e) {
            if (isIndex < languages.length - 1) {
                setIsIndex(isIndex += 1)
            }
        },

        back: () => {
            onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="settings-langugae-content-box">

            {languages.map((val, i) => {
                return (
                    <div key={val.id} className={control.isActive && i == isIndex ? "settings-language-item-box active" : "settings-language-item-box"} onMouseMove={() => {
                        dispatch(
                            {
                                type: 'CHANGE_CONTROLS',
                                payload: {
                                    name: 'settings-language-items'
                                }
                            }
                        )
                        setIsIndex(i)
                    }} onClick={control.ok}>

                        {val.type == localStorage.getItem('language') ? <img className='settings-language-item-icon-box' src={selectidLogo} /> : false}

                        <div className='settings-language-item-name-box'>{val.name}</div>

                        <img className='settings-language-item-flag-box' src={val.img} />

                    </div>
                )
            })}

        </div>
    )
}

export default RenderSettingsLanguageContent