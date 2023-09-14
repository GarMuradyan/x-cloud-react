import Gojologo from '../../images/gojo.png'
import Logo from '../../images/Logo.png'
import RenderLoginForm from './loginForm.jsx'
import '../../css/login.css'
import RenderLoadingBox from '../loading.jsx'
import { useEffect, useRef } from 'react'
import QRCodeGenerator from './loginQrCode.jsx'

function RenderLogin () {

    const loadingRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            loadingRef.current.style.opacity = '0'
        }, 1500);
    }, [])

    return (
        <div className="login-page-box">


            <img className='login-logo' src={Gojologo} placeholder='blur' />

            <div ref={loadingRef} className='login-page-loading-box'>

                <img src={Logo} className='login-page-loading-logo-box' />

                <div className='login-page-loading-icon'>

                    <RenderLoadingBox />

                </div>

            </div>

            <div className='login-content-box'>

                <QRCodeGenerator />

                <RenderLoginForm />

            </div>


        </div>
    )
}

export default RenderLogin