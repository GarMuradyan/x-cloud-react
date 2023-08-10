import { memo } from "react"
import RenderLiveTvClock from "./liveTvClock.jsx"

function RenderLiveTvClockAndMonth () {
    return (
        <div className="live-tv-clock-and-month-box">

            <RenderLiveTvClock />

        </div>
    )
}

export default memo(RenderLiveTvClockAndMonth)