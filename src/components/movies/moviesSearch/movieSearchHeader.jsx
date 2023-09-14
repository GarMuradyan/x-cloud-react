import RenderBackButton from "../../back.jsx"
import searchLogo from '../../../images/search.png'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../../remote/useKeydown"

function RenderMovieSearchHeader ({ value, onCLose, searchList }) {

    const dispatch = useDispatch()

    const backClick = () => {
        onCLose()
    }

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let control = {
        isActive: currentControls == 'search-back',

        ok: function (e) {
            backClick()
        },

        left: function (e) {

        },

        right: function (e) {

        },

        up: function (e) {
        },

        down: function (e) {
            if (searchList.length) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movies-search-list'
                        }
                    }
                )
            } else {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'keyboard'
                        }
                    }
                )
            }

        },

        back: () => {
            backClick()
        }
    }

    useKeydown(control)

    return (
        <div className="search-header-box">

            <div className={control.isActive ? "search-back-box active" : 'search-back-box'} onClick={backClick} onMouseMove={() => {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'search-back'
                        }
                    }
                )
            }}>

                <RenderBackButton />

            </div>

            <div className="search-search-bar-box">

                <img src={searchLogo} className="search-bar-icon" />

                <input className="search-bar-input" value={value} onChange={() => {

                }} />

            </div>

        </div>
    )
}

export default RenderMovieSearchHeader