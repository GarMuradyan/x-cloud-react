import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"

function RenderParentalKeyboard ({ onClose, cb }) {

    const pinKeyboard = [{ key: '1', type: 'basic' }, { key: '2', type: 'basic' }, { key: '3', type: 'basic' }, { key: '4', type: 'basic' }, { key: '5', type: 'basic' }, { key: '6', type: 'basic' }, { key: '7', type: 'basic' }, { key: '8', type: 'basic' }, { key: '9', type: 'basic' }, { key: '0', type: 'basic' }]


    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let [isIndex, setIsIndex] = useState(0)

    let control = {
        isActive: currentControls == 'settings-parental-keyboard',

        ok: function (e) {
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
                    <div key={i} className={control.isActive && i == isIndex ? "parental-keyboard-item-box active" : "parental-keyboard-item-box"}>{val.key}</div>
                )
            })}

        </div>
    )
}

export default RenderParentalKeyboard