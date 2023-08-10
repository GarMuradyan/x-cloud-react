import { memo } from "react"
import liveTvNotFound from '../../images/liveTvNotFound.png'
import { useSelector } from "react-redux";

function RenderLiveTvChannelsCard ({ data, isActive, index }) {

    const selectidChannel = useSelector(function (state) {
        return state.selectidChannel
    })

    let channel_name = data.name;

    let trimmed_category_name = channel_name.replace(/⭐️/g, '');

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })
    return (
        <div style={{ top: index * 95 + 'px', backgroundColor: data.stream_id == selectidChannel.stream_id ? 'rgba(29, 85, 29, 0.55)' : 'transparent' }} className={isActive ? "live-tv-channel-card-box active" : "live-tv-channel-card-box"}>

            <div style={{ opacity: currentControls == 'live-tv-channels' || currentControls == 'live-tv-full-screen' ? '1' : '0' }} className="live-tv-channel-card-num-box">{index + 1}</div>

            <img style={{ left: currentControls !== 'live-tv-channels' ? '2.1rem' : false }} className="live-tv-channel-card-poster-box" src={data.stream_icon || liveTvNotFound} />

            <div style={{ opacity: currentControls == 'live-tv-channels' || currentControls == 'live-tv-full-screen' ? '1' : '0' }} className="live-tv-channel-card-name-box">{trimmed_category_name}</div>

        </div>
    )
}

export default memo(RenderLiveTvChannelsCard)