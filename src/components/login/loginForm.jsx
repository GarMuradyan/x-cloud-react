import { useState } from 'react'
import '../../css/login.css'
import useKeydown from '../../remote/useKeydown'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import words from '../settings/words'

function RenderLoginForm () {

    const login_form_data = [{ name: 'Provider' }, { name: words[localStorage.getItem('language')].username }, { name: words[localStorage.getItem('language')].password }]
    const [showKeyboard, setShowKeyboard] = useState(false)
    let [isIndex, setIsIndex] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const itemClick = (e) => {
        if (isIndex == 3) {
            localStorage.setItem('token', '123456')
            navigate('/menu')
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

    let control = {
        isActive: currentControls == 'login-items',

        ok: function (e) {
            itemClick(e)
        },

        left: function (e) {

        },

        right: function (e) {

        },

        up: function (e) {
            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        down: function (e) {
            if (isIndex < 4) {
                setIsIndex(isIndex += 1)
            }

            if (isIndex == 4) {
                setIsIndex(3)
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'login-language'
                        }
                    }
                )
            }
        }


    }

    useKeydown(control)

    return (
        <div className="login-form-box">

            {login_form_data.map((val, i) => {

                return (
                    <input key={i} className={control.isActive && isIndex == i ? 'login-form-input-box active' : 'login-form-input-box'} placeholder={val.name} onClick={itemClick} />
                )

            })}

            <button className={control.isActive && isIndex == 3 ? 'login-form-button-box active' : 'login-form-button-box'} onClick={itemClick} >Login</button>

        </div>
    )
}

export default RenderLoginForm