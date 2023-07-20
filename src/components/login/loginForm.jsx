import { useState } from 'react'
import '../../css/login.css'
import useKeydown from '../../remote/useKeydown'
import { useNavigate } from 'react-router-dom'

function RenderLoginForm () {

    const login_form_data = [{ name: 'Provider' }, { name: 'username' }, { name: 'password' }]
    const [showKeyboard, setShowKeyboard] = useState(false)
    let [isIndex, setIsIndex] = useState(0)
    const navigate = useNavigate()

    const itemClick = (e) => {
        console.log('click');
        if (isIndex == 3) {
            localStorage.setItem('token', '123456')
            navigate('/menu')

        }
    }

    useKeydown({
        isActive: true,

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
            if (isIndex < 3) {
                setIsIndex(isIndex += 1)
            }
        }


    })

    return (
        <div className="login-form-box">

            {login_form_data.map((val, i) => {

                return (
                    <input key={i} className={isIndex == i ? 'login-form-input-box active' : 'login-form-input-box'} placeholder={val.name} onClick={itemClick} />
                )

            })}

            <button className={isIndex == 3 ? 'login-form-button-box active' : 'login-form-button-box'} onClick={itemClick} >Login</button>

        </div>
    )
}

export default RenderLoginForm