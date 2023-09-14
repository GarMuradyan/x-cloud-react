import { useState } from "react"
import useKeydown from "../../remote/useKeydown"
import { useDispatch, useSelector } from "react-redux"
import RenderBackButton from "../back.jsx"
import RenderParentalCodeInputs from "./settingsParentalCodeInputs.jsx"
import RenderParentalKeyboard from "./settingsParentalKeyboard.jsx"
import words from "./words"

function RenderSettingsParentalCode ({ onClose, cb, type }) {

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const [pinCode, setPinCode] = useState({
        title: words[localStorage.getItem('language')].enterPin,
        value: '',
        type: 'Enter Pin',
        newPin: ''
    })

    let control = {
        isActive: currentControls == 'settings-parental-back',

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
                        name: 'settings-parental-inputs'
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
                        name: 'settings-parental-inputs'
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
        <div className="settings-parental-code-page">

            <div className={control.isActive ? "settings-parental-back-box active" : "settings-parental-back-box"} onClick={onClose} onMouseMove={() => {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'settings-parental-back'
                        }
                    }
                )
            }}>
                <RenderBackButton />
            </div>

            <RenderParentalCodeInputs onClose={onClose} cb={cb} pinCode={pinCode} />

            <RenderParentalKeyboard onClose={onClose} cb={cb} pinCode={pinCode} setPinCode={setPinCode} type={type} />

        </div>
    )
}

export default RenderSettingsParentalCode