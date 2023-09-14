import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import words from "./words"

function RenderParentalKeyboard ({ onClose, cb, pinCode, setPinCode, type }) {

    const dispatch = useDispatch()

    const pinKeyboard = [{ key: '1', type: 'basic' }, { key: '2', type: 'basic' }, { key: '3', type: 'basic' }, { key: '4', type: 'basic' }, { key: '5', type: 'basic' }, { key: '6', type: 'basic' }, { key: '7', type: 'basic' }, { key: '8', type: 'basic' }, { key: '9', type: 'basic' }, { key: '0', type: 'basic' }]

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const [wrongPin, setWrongPin] = useState(false)
    const [confirmPin, setConfirmPin] = useState(false)
    let [isIndex, setIsIndex] = useState(0)

    let control = {
        isActive: currentControls == 'settings-parental-keyboard',

        ok: function (e) {
            setPinCode({
                title: pinCode.title,
                value: pinCode.value += pinKeyboard[isIndex].key,
                type: pinCode.type,
                newPin: pinCode.newPin
            })
            console.log(pinCode)
            if (pinCode.value.length == 4) {
                if (type == 'Change Pin') {
                    if (pinCode.type == 'Enter Pin') {
                        if (pinCode.value == localStorage.getItem('pinCode')) {
                            console.log('eeeee')
                            setPinCode({
                                title: words[localStorage.getItem('language')].enterNewPin,
                                value: '',
                                type: 'Enter New Pin',
                                newPin: ''
                            })
                        } else {
                            setWrongPin(true)
                            setTimeout(() => {
                                setWrongPin(false)
                            }, 300);
                            console.log('nooo')
                            setPinCode({
                                title: words[localStorage.getItem('language')].enterPin,
                                value: '',
                                type: 'Enter Pin',
                                newPin: ''
                            })
                        }
                    }

                    if (pinCode.type == 'Enter New Pin') {
                        setPinCode({
                            title: words[localStorage.getItem('language')].confirmPin,
                            value: '',
                            type: 'Confirm PIN',
                            newPin: pinCode.value
                        })
                    }

                    if (pinCode.type == 'Confirm PIN') {
                        if (pinCode.value == pinCode.newPin) {
                            setConfirmPin(true)
                            localStorage.setItem('pinCode', pinCode.newPin)
                            setPinCode({
                                title: words[localStorage.getItem('language')].enterPin,
                                value: '',
                                type: 'Enter Pin',
                                newPin: ''
                            })
                            setTimeout(() => {
                                cb()
                            }, 200);
                        } else {
                            setPinCode({
                                title: words[localStorage.getItem('language')].confirmPin,
                                value: '',
                                type: 'Confirm PIN',
                                newPin: pinCode.newPin
                            })
                            setWrongPin(true)
                            setTimeout(() => {
                                setWrongPin(false)
                            }, 300);
                        }
                    }
                } else {
                    if (pinCode.value == localStorage.getItem('pinCode')) {
                        console.log('eeeee')
                        setPinCode({
                            title: words[localStorage.getItem('language')].enterPin,
                            value: '',
                            type: 'Enter Pin',
                            newPin: ''
                        })
                        cb()
                    } else {
                        setWrongPin(true)
                        setTimeout(() => {
                            setWrongPin(false)
                        }, 300);
                        console.log('nooo')
                        setPinCode({
                            title: words[localStorage.getItem('language')].enterPin,
                            value: '',
                            type: 'Enter Pin',
                            newPin: ''
                        })
                    }
                }
            }
        },

        left: function (e) {
            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {
            if (isIndex < pinKeyboard.length - 1) {
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-parental-inputs'
                    }
                }
            )

        },

        down: function (e) {

        },

        back: () => {
            onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="parental-keyboard-box">

            {pinKeyboard.map((val, i) => {
                return (
                    <div key={i} className={control.isActive && i == isIndex ? "parental-keyboard-item-box active" : "parental-keyboard-item-box"} onClick={control.ok} onMouseMove={() => {
                        dispatch(
                            {
                                type: 'CHANGE_CONTROLS',
                                payload: {
                                    name: 'settings-parental-keyboard'
                                }
                            }
                        )
                        setIsIndex(i)
                    }}>{val.key}</div>
                )
            })}

            {wrongPin ? <div className="wrong-pin">{words[localStorage.getItem('language')].wrongPin}</div> : false}

            {confirmPin ? <div className="confirm-new-pin">{words[localStorage.getItem('language')].confirmedNewPin}</div> : false}

        </div>
    )
}

export default RenderParentalKeyboard