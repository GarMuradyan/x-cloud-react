import { memo } from "react"
import notFound from '../../images/userNf.png'

function RenderFriendsListCard ({ data }) {
    return (
        <div className="friends-list-card-box">

            <div className="friends-list-card-name-box">{data.name}</div>

            <img src={data.poster || notFound} className="friends-list-card-logo-box" />

        </div>
    )
}

export default memo(RenderFriendsListCard)