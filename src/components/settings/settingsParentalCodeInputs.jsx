import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import { useState } from "react"
import pinPng from '../../images/pin.png'

function RenderParentalCodeInputs ({ onClose, cb, pinCode }) {

    const dispatch = useDispatch()

    const arr = [1, 2, 3, 4]

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let [isIndex, setIsIndex] = useState(0)

    let control = {
        isActive: currentControls == 'settings-parental-inputs',

        ok: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-parental-keyboard'
                    }
                }
            )
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
                        <div key={i} style={{ backgroundImage: pinCode.value[i] ? `url(${ pinPng })` : false, border: pinCode.value[i] ? '0.3rem solid white' : false }} className={control.isActive && i == isIndex ? "parental-code-inputs-item-box active" : "parental-code-inputs-item-box"} onMouseMove={() => {
                            dispatch(
                                {
                                    type: 'CHANGE_CONTROLS',
                                    payload: {
                                        name: 'settings-parental-inputs'
                                    }
                                }
                            )
                            setIsIndex(i)
                        }} onClick={control.ok}></div>
                    )
                })}

            </div>

        </div>
    )
}

export default RenderParentalCodeInputs