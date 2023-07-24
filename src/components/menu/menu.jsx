import RenderMenuCard from "./menuCard.jsx"
import movieLogo from '../../images/movie.png'
import seriesLogo from '../../images/series.png'
import liveLogo from '../../images/live.png'
import settingsLogo from '../../images/settings.png'
import Logo from '../../images/Logo.png'
import '../../css/menu.css'
import { useState } from "react"
import useKeydown from "../../remote/useKeydown"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

function RenderMenu () {

    const menu_data = [
        {
            name: 'Live Tv',
            path: '/liveTv',
            img: liveLogo,
            dispatch: function () {

            }
        },
        {
            name: 'Movies',
            path: '/movie',
            img: movieLogo,
            dispatch: function () {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movies'
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
            name: 'Series',
            path: '/series',
            img: seriesLogo,
            dispatch: function () {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movies'
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
            name: 'Settings',
            path: '/settings',
            img: settingsLogo,
            dispatch: function () {

            }
        },
    ]

    let [isIndex, setIsIndex] = useState(0)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useKeydown({
        isActive: true,

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
            if (isIndex < 3) {
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {

        },

        down: function (e) {

        }
    })

    return (
        <div className="menu-page-box">

            <img className="menu-logo-box" src={Logo} placeholder="blur" />

            <div className="menu-content-box">

                {menu_data.map((val, i) => {
                    return (
                        <RenderMenuCard key={i} data={val} isActive={isIndex == i} />
                    )
                })}

            </div>

        </div>
    )
}

export default RenderMenu