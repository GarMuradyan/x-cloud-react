import RenderLiveTvPrograms from './liveTvPrograms.jsx'
import RenderLiveTvClockAndMonth from './liveTvClockAndMonth.jsx'

function RenderLiveTvLoading () {
    return (
        <div className="live-tv-loading-box">

            <div className='live-tv-loading-channels-box'>

                <div className='live-tv-loading-channel-box'></div>
                <div className='live-tv-loading-channel-box'></div>
                <div className='live-tv-loading-channel-box'></div>
                <div className='live-tv-loading-channel-box'></div>
                <div className='live-tv-loading-channel-box'></div>
                <div className='live-tv-loading-channel-box'></div>
                <div className='live-tv-loading-channel-box'></div>
                <div className='live-tv-loading-channel-box'></div>
                <div className='live-tv-loading-channel-box'></div>
                <div className='live-tv-loading-channel-box'></div>
                <div className='live-tv-loading-channel-box'></div>

            </div>

            <RenderLiveTvPrograms />

            <RenderLiveTvClockAndMonth />

        </div>
    )
}

export default RenderLiveTvLoading