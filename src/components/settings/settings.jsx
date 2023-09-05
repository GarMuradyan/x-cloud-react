import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import { useState } from "react"
import RenderBackButton from "../back.jsx"
import '../../css/settings.css'
import { useNavigate } from "react-router-dom"
import RenderSettingsItem from './settingsItem.jsx'
import words from "./words"

function RenderSettingsPage () {

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const backClick = () => {
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

    let control = {
        isActive: currentControls == 'settings-back',

        ok: function (e) {
            backClick()
        },

        left: function (e) {

        },

        right: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-items'
                    }
                }
            )
        },

        up: function (e) {


        },

        down: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-items'
                    }
                }
            )
        },

        back: () => {
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

    useKeydown(control)

    return (
        <div className="settings-page-box">

            <div className="settings-page-header-box">

                <div className={control.isActive ? "settings-header-back-box active" : 'settings-header-back-box'} onMouseMove={() => {
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'settings-back'
                            }
                        }
                    )
                }} onClick={backClick}><RenderBackButton /></div>

                <div className="settings-header-title-box">{words[localStorage.getItem('language')].settings}</div>

            </div>

            <RenderSettingsItem />

        </div>
    )
}

export default RenderSettingsPage