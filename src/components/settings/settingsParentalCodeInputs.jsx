import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import { useState } from "react"
import { pinCode } from "./settingsParentalCode.jsx"

function RenderParentalCodeInputs ({ onClose, cb }) {

    const arr = [1, 2, 3, 4]

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let [isIndex, setIsIndex] = useState(0)

    let control = {
        isActive: currentControls == 'settings-parental-inputs',

        ok: function (e) {
            onClose()
        },

        left: function (e) {
            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {
            if (isIndex < arr.length - 1) {
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-parental-back'
                    }
                }
            )

        },

        down: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-parental-keyboard'
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
        <div className="parental-code-inputs-page-box">

            <div className="parental-code-inputs-title-box">{pinCode.title}</div>

            <div className="parental-code-inputs-box">

                {arr.map((val, i) => {
                    return (
                        <div key={i} className={control.isActive && i == isIndex ? "parental-code-inputs-item-box active" : "parental-code-inputs-item-box"}></div>
                    )
                })}

            </div>

        </div>
    )
}

export default RenderParentalCodeInputs