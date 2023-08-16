import { useState } from "react"
import useKeydown from "../../remote/useKeydown"
import { useDispatch, useSelector } from "react-redux"
import RenderBackButton from "../back.jsx"
import RenderParentalCodeInputs from "./settingsParentalCodeInputs.jsx"
import RenderParentalKeyboard from "./settingsParentalKeyboard.jsx"

function RenderSettingsParentalCode ({ onClose, cb, type }) {

    const [pinCode, setPinCode] = useState({
        title: 'Enter Pin',
        value: '',
        type: 'Enter Pin',
        newPin: ''
    })

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
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

            <div className={control.isActive ? "settings-parental-back-box active" : "settings-parental-back-box"}>
                <RenderBackButton />
            </div>

            <RenderParentalCodeInputs onClose={onClose} cb={cb} pinCode={pinCode} />

            <RenderParentalKeyboard onClose={onClose} cb={cb} pinCode={pinCode} setPinCode={setPinCode} type={type} />

        </div>
    )
}

export default RenderSettingsParentalCode