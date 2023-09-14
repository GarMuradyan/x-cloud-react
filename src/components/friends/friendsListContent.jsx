import { memo } from 'react'
import RenderFriendsListCard from './friendsListCard.jsx'

function RenderFriendsListContent ({ friendsList }) {
    return (
        <div className="friends-list-row-box">

            <div className="friends-list-row-content-box">

                {friendsList.map((val, i) => {
                    return (
                        <RenderFriendsListCard key={val} data={val} />
                    )
                })}

            </div>

        </div>
    )
}

export default memo(RenderFriendsListContent)

