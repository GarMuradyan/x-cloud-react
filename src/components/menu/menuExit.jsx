import { useEffect, useRef, useState } from "react"
import useKeydown from "../../remote/useKeydown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import words from "../settings/words"

function RenderMenuExit ({ onClose }) {

    const exitRef = useRef(null)

    const arr = [{ name: words[localStorage.getItem('language')].cancel, type: 'cancel' }, { name: words[localStorage.getItem('language')].exit, type: 'exit' }]

    let [isIndex, setIsIndex] = useState(0)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const cardClick = (data) => {
        if (data.type == 'exit') {
            if (window.tizen) {
                window.tizen.application.getCurrentApplication().exit();
            }
        }
        exitRef.current ? exitRef.current.style.opacity = '0' : false
        setTimeout(() => {
            onClose(false)
        }, 300);
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'menu-item'
                }
            }
        )
    }

    let control = {
        isActive: currentControls == 'menu-exit',

        ok: function (e) {
            cardClick(arr[isIndex])
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

        },

        down: function (e) {
        },

        back: () => {
            exitRef.current ? exitRef.current.style.opacity = '0' : false
            setTimeout(() => {
                onClose(false)
            }, 300);
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'menu-item'
                    }
                }
            )
        }
    }

    useKeydown(control)

    useEffect(() => {
        setTimeout(() => {
            exitRef.current ? exitRef.current.style.opacity = '1' : false
        }, 0);
    }, [])

    return (
        <div ref={exitRef} className="menu-exit-parent-box">

            <div className="menu-exit-box">

                {arr.map((val, i) => {
                    return (
                        <div key={i} className={control.isActive && i == isIndex ? "menu-exit-item-box active" : 'menu-exit-item-box'} onClick={() => {
                            cardClick(val)
                        }}>{val.name}</div>
                    )
                })}

            </div>

        </div>
    )
}

export default RenderMenuExit