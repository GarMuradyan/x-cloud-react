import { useDispatch, useSelector } from "react-redux"
import RenderBackButton from "../back.jsx"
import useKeydown from "../../remote/useKeydown.js"
import RenderSettingsLanguageContent from "./settingsLanguageContent.jsx"

function RenderSettingsLanguage ({ onClose }) {

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let control = {
        isActive: currentControls == 'settings-language-back',

        ok: function (e) {
            onClose()
        },

        left: function (e) {

        },

        right: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-language-items'
                    }
                }
            )
        },

        up: function (e) {


        },

        down: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-language-items'
                    }
                }
            )
        },

        back: () => {
            onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="settings-language-page-box">

            <div className={control.isActive ? "settings-language-back-box active" : "settings-language-back-box"} onMouseMove={() => {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'settings-language-back'
                        }
                    }
                )
            }} onClick={onClose}>

                <RenderBackButton />

            </div>

            <RenderSettingsLanguageContent onClose={onClose} />

        </div>
    )
}

export default RenderSettingsLanguage