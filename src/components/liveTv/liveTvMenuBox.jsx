import { memo } from "react"

function RenderLiveTvMenuBox () {

    const liveMenuArr = [
        {
            name: 'Sort',
            color: 'red',
            id: 0
        },
        {
            name: 'Category',
            color: 'green',
            id: 1
        },
        {
            name: 'Favorites',
            color: 'yellow',
            id: 2
        },
        {
            name: 'Menu',
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