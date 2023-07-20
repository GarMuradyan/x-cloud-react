import Logo from '../../images/Logo.png'
import RenderLoginForm from './loginForm.jsx'
import '../../css/login.css'

function RenderLogin () {
    return (
        <div className="login-page-box">

            <div className='login-content-box'>

                <img src={Logo} placeholder='blur' />

                <RenderLoginForm />

            </div>


        </div>
    )
}

export default RenderLogin