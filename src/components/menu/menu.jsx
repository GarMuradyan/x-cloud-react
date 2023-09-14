import RenderMenuCard from "./menuCard.jsx"
import movieLogo from '../../images/movie.png'
import seriesLogo from '../../images/series.png'
import liveLogo from '../../images/live.png'
import friendsLogo from '../../images/friends.png'
import settingsLogo from '../../images/settings.png'
import Logo from '../../images/Logo.png'
import '../../css/menu.css'
import { useState } from "react"
import useKeydown from "../../remote/useKeydown"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import RenderMenuExit from "./menuExit.jsx"
import words from "../settings/words.js"
import req from "../requests/req.js"

function RenderMenu () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const menu_data = [
        {
            name: words[localStorage.getItem('language')].liveTv,
            path: '/live_tv',
            img: liveLogo,
            dispatch: function () {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'live-tv-channels'
                        }
                    }
                )

                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: null
                        }
                    }
                )
            }

        },
        {
            name: words[localStorage.getItem('language')].movies,
            path: '/movie',
            img: movieLogo,
            dispatch: function () {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'category'
                        }
                    }
                )

                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CATEGORY',
                        payload: {
                            category: 0
                        }
                    }
                )

                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CATEGORY_ID',
                        payload: {
                            categoryId: 0
                        }
                    }
                )
            }
        },
        {
            name: words[localStorage.getItem('language')].series,
            path: '/series',
            img: seriesLogo,
            dispatch: function () {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'category'
                        }
                    }
                )

                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CATEGORY',
                        payload: {
                            category: 0
                        }
                    }
                )

                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CATEGORY_ID',
                        payload: {
                            categoryId: 0
                        }
                    }
                )
            }
        },
        // {
        //     name: words[localStorage.getItem('language')].friends,
        //     path: '/friends',
        //     img: friendsLogo,
        //     dispatch: function () {
        //         dispatch(
        //             {
        //                 type: 'CHANGE_CONTROLS',
        //                 payload: {
        //                     name: ''
        //                 }
        //             }
        //         )
        //     }
        // },
        {
            name: words[localStorage.getItem('language')].settings,
            path: '/settings',
            img: settingsLogo,
            dispatch: function () {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'settings-items'
                        }
                    }
                )

                function getData () {
                    req('http://xtream.in:9000/player_api.php?username=Aa6262699165AYR52&password=Aa52527965QGDS4256&type=m3u&action=get_series_categories', 'GET', '').then((res) => {
                        console.log(res)
                    }).catch((err) => {
                        console.log(err)
                    })
                }

                getData()
            }
        },
    ]

    let [isIndex, setIsIndex] = useState(0)
    const [showExit, setShowExit] = useState(false)

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let control = {
        isActive: currentControls == 'menu-item',

        ok: function (e) {
            navigate(menu_data[isIndex].path)
            menu_data[isIndex].dispatch()

        },

        left: function (e) {
            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {
            if (isIndex < menu_data.length - 1) {
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {

        },

        down: function (e) {

        },

        back: () => {
            setShowExit(true)
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'menu-exit'
                    }
                }
            )
        }
    }

    useKeydown(control)

    return (
        <div className="menu-page-box">

            <img className="menu-logo-box" src={Logo} placeholder="blur" />

            <div className="menu-content-box">

                {menu_data.map((val, i) => {
                    return (
                        <RenderMenuCard key={i} data={val} isActive={control.isActive && isIndex == i} index={i} setIsindex={setIsIndex} />
                    )
                })}

            </div>

            {showExit ? <RenderMenuExit onClose={setShowExit} /> : false}

        </div>
    )
}

export default RenderMenu