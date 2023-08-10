import { useState } from "react"
import useKeydown from "../../remote/useKeydown"
import { useDispatch, useSelector } from "react-redux"
import RenderBackButton from "../back.jsx"
import RenderParentalCodeInputs from "./settingsParentalCodeInputs.jsx"
import RenderParentalKeyboard from "./settingsParentalKeyboard.jsx"

export const pinCode = {
    title: 'Enter',
    value: '',
}

function RenderSettingsParentalCode ({ onClose, cb }) {

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

            <RenderParentalCodeInputs onClose={onClose} cb={cb} />

            <RenderParentalKeyboard onClose={onClose} cb={cb} />

        </div>
    )
}

export default RenderSettingsParentalCode