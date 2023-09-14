import { memo, useState } from "react"
import RenderFriendsListContent from './friendsListContent.jsx'

function RenderFriendsList () {

    const [friendsList, setFriendsList] = useState([{ name: 'Arman' }])

    return (
        <div className="friends-list-box">

            <div className="friends-list-title-box">Friends</div>

            {friendsList.length ? <RenderFriendsListContent friendsList={friendsList} /> : <div className="friends-not-found-box">Not Friends</div>}

        </div>
    )
}

export default memo(RenderFriendsList)