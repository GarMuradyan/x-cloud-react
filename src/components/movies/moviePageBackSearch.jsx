import searchLogo from '../../images/search.png'
import '../../css/movies.css'
import { useState } from 'react'
import Portal from '../portal.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useKeydown from '../../remote/useKeydown'
import RenderBackButton from '../back.jsx'

function RenderMovieBackSearch ({ movies }) {

    const navigate = useNavigate()

    const location = useLocation()

    const searchButtonClick = () => {
        if (location.pathname == '/movie') {
            const stateData = {
                type: 'movie',
            };
            navigate('/search', { state: stateData })
        } else {
            const stateData = {
                type: 'series',
            };
            navigate('/search', { state: stateData })
        }
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'keyboard'
                }
            }
        )
        dispatch(
            {
                type: 'CHANGE_SEARCH_INPUT_VALUE',
                payload: {
                    value: ''
                }
            }
        )

        dispatch(
            {
                type: 'CHANGE_SEARCH_LIST',
                payload: {
                    list: []
                }
            }
        )
    }

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const dispatch = useDispatch()

    let [isIndex, setIsIndex] = useState(true)

    let control = {
        isActive: currentControls == 'search-button',

        ok: function (e) {
            if (isIndex == 0) {
                navigate('/menu')
            } else if (isIndex == 1) {
                searchButtonClick()
            }
        },

        left: function (e) {
            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {

            if (isIndex == 1) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movies'
                        }
                    }
                )
            }

            if (isIndex < 1) {
                setIsIndex(isIndex += 1)
            }

        },

        up: function (e) {


        },

        down: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'category'
                    }
                }
            )
        },

        back: () => {
            navigate('/menu')
        }

    }

    useKeydown(control)

    return (
        <div className="movie-back-search-box">

            <div className={control.isActive && isIndex == 0 ? "movie-top-back-box active" : "movie-top-back-box"}>

                <RenderBackButton />

            </div>

            <div className={control.isActive && isIndex == 1 ? 'movie-top-search-box active' : 'movie-top-search-box'} onClick={searchButtonClick}>

                <img src={searchLogo} placeholder='blur' />

                Search

            </div>

        </div>
    )
}

export default RenderMovieBackSearch