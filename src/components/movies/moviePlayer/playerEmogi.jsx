import { memo } from "react"
import { useSelector } from "react-redux"
import RenderPlayerEmogiTexts from './playerEmogiTexts.jsx'

function RenderPlayerEmogi () {

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    return (
        <div style={{ transform: currentControls == 'player-texts' ? 'translateX(0rem)' : 'translateX(200rem)' }} className="player-emogi-box">

            <RenderPlayerEmogiTexts />

        </div>
    )
}

export default memo(RenderPlayerEmogi)