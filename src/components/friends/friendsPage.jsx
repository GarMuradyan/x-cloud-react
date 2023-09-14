import { memo } from 'react'
import '../../css/friends.css'
import RenderFriendsList from './friendsList.jsx'

function RenderFriendsPage () {
    return (
        <div className="friends-page-box">

            <RenderFriendsList />

        </div>
    )
}

export default memo(RenderFriendsPage)