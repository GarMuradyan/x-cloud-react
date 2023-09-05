import { memo } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import words from "../settings/words"

function RenderLiveTvMenuBox () {

    const liveMenuArr = [
        {
            name: words[localStorage.getItem('language')].sort,
            color: 'red',
            id: 0
        },
        {
            name: words[localStorage.getItem('language')].category,
            color: 'green',
            id: 1
        },
        {
            name: words[localStorage.getItem('language')].favorite,
            color: 'yellow',
            id: 2
        },
        {
            name: words[localStorage.getItem('language')].menu,
            color: 'blue',
            id: 3
        }
    ]

    return (
        <div className="live-tv-menu-box">

            {liveMenuArr.map((val, i) => {
                return (
                    <div key={val.id} className="live-tv-menu-item-box">

                        <div style={{ backgroundColor: val.color }} className="live-tv-menu-item-color-box"></div>

                        <div className="live-tv-menu-item-name-box">{val.name}</div>

                    </div>
                )
            })}

        </div>
    )
}

export default memo(RenderLiveTvMenuBox)