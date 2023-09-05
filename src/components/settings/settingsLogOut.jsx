import { useEffect, useRef, useState } from "react"
import useKeydown from "../../remote/useKeydown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import words from "./words"

function RenderSettingsLogOut ({ onClose }) {

    const arr = [{ name: words[localStorage.getItem('language')].cancel, type: 'cancel' }, { name: words[localStorage.getItem('language')].logOut, type: 'log out' }]

    const navigate = useNavigate()

    let [isIndex, setIsIndex] = useState(0)

    const logOutRef = useRef(null)

    const cardClick = (data) => {
        if (data.type == 'log out') {
            navigate('/login')
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'login-items'
                    }
                }
            )
        } else {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-items'
                    }
                }
            )
            logOutRef.current ? logOutRef.current.style.opacity = '0' : false
            setTimeout(() => {
                onClose(false)
            }, 300);
        }
    }

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let control = {
        isActive: currentControls == 'settings-log-out',

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
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-items'
                    }
                }
            )
            logOutRef.current ? logOutRef.current.style.opacity = '0' : false
            setTimeout(() => {
                onClose(false)
            }, 300);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            logOutRef.current ? logOutRef.current.style.opacity = '1' : false
        }, 0);
    }, [])

    useKeydown(control)

    return (
        <div ref={logOutRef} className="settings-log-out-box">

            <div className="log-out-box">

                {arr.map((val, i) => {
                    return (
                        <div key={i} className={control.isActive && i == isIndex ? "log-out-item-box active" : 'log-out-item-box'} onClick={() => {
                            cardClick(val)
                        }} onMouseMove={() => {
                            setIsIndex(i)
                        }}>{val.name}</div>
                    )
                })}

            </div>

        </div>
    )
}

export default RenderSettingsLogOut