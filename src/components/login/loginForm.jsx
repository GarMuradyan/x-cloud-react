import { useState } from 'react'
import '../../css/login.css'
import useKeydown from '../../remote/useKeydown'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import words from '../settings/words'
import RenderKeyboard from '../keyboard/keyboard.jsx'
import req from '../requests/req'

function RenderLoginForm () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const login_form_data = [{ name: words[localStorage.getItem('language')].username }]
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [value, setValue] = useState('')
    const url = 'http://192.168.8.127:6543/api/register'
    const body = { mac: localStorage.getItem('mac'), model: 'Web', username: value }
    let [isIndex, setIsIndex] = useState(0)

    const itemClick = (e) => {
        if (isIndex == 1) {
            if (value) {
                req(url, 'POST', body).then((res) => {
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('user', JSON.stringify(res.user))
                    navigate('/menu')
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'menu-item'
                            }
                        }
                    )
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    const onClose = () => {
        setShowKeyboard(false)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'login-items'
                }
            }
        )
    }

    let control = {
        isActive: currentControls == 'login-items',

        ok: function (e) {
            setShowKeyboard(true)
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'keyboard'
                    }
                }
            )
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
            if (isIndex < 1) {
                setIsIndex(isIndex += 1)
            }
        }


    }

    useKeydown(control)

    return (
        <div className="login-form-box">

            {login_form_data.map((val, i) => {

                return (
                    <input value={value} onChange={() => {

                    }} key={i} className={control.isActive && isIndex == i ? 'login-form-input-box active' : 'login-form-input-box'} placeholder={val.name} onClick={itemClick} />
                )

            })}

            <button className={control.isActive && isIndex == 1 ? 'login-form-button-box active' : 'login-form-button-box'} onClick={itemClick} >Login</button>

            {showKeyboard ? <div className='login-keyboard-box'><RenderKeyboard setValue={setValue} value={value} onClose={onClose} /></div> : false}

        </div>
    )
}

export default RenderLoginForm