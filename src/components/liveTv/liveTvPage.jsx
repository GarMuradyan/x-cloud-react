import RenderLiveTvCategoriesAndChannels from "./liveTvCategoriesAndChannels.jsx"
import '../../css/liveTv.css'
import RenderLiveTvPrograms from "./liveTvPrograms.jsx"
import RenderLiveTvClockAndMonth from "./liveTvClockAndMonth.jsx"

function RenderLiveTvPage () {
    return (
        <div className="live-tv-page-box">

            <RenderLiveTvCategoriesAndChannels />

            <RenderLiveTvPrograms />

            <RenderLiveTvClockAndMonth />

        </div>
    )
}

export default RenderLiveTvPage