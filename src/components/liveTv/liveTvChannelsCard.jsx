import { memo } from "react"
import liveTvNotFound from '../../images/liveTvNotFound.png'
import { useSelector } from "react-redux";
import lockPng from "../../images/lock.png"
import { liveTvLock } from "../settings/settingsConfig";
import { liveTvFavorits } from "./liveTVConfig";
import favoritLogo from '../../images/favorit.png'

function RenderLiveTvChannelsCard ({ data, isActive, index }) {

    const selectidChannel = useSelector(function (state) {
        return state.selectidChannel
    })

    const selectidLiveCategory = useSelector(function (state) {
        return state.selectidLiveCategory
    })

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let channel_name = data.name;

    let trimmed_category_name = channel_name.replace(/⭐️/g, '');

    return (
        <div style={{ top: index * 95 + 'px', backgroundColor: selectidChannel && data.stream_id == selectidChannel.stream_id ? 'rgba(29, 85, 29, 0.55)' : 'transparent' }} className={isActive ? "live-tv-channel-card-box active" : "live-tv-channel-card-box"}>

            <div style={{ opacity: currentControls == 'live-tv-channels' || currentControls == 'live-tv-full-screen' ? '1' : '0' }} className="live-tv-channel-card-num-box">{index + 1}</div>

            <img style={{ left: currentControls !== 'live-tv-channels' ? '2.1rem' : false }} className="live-tv-channel-card-poster-box" src={data.stream_icon || liveTvNotFound} />

            <div style={{ opacity: currentControls == 'live-tv-channels' || currentControls == 'live-tv-full-screen' ? '1' : '0' }} className="live-tv-channel-card-name-box">{trimmed_category_name}</div>

            {liveTvLock[data.category_id] && selectidLiveCategory.category_id <= 0 ? <img style={{ opacity: currentControls !== 'live-tv-channels' ? '0' : '1' }} className="live-tv-channel-card-locked-box" src={lockPng} /> : false}

            {liveTvFavorits[data.stream_id] ? <img style={{ opacity: currentControls !== 'live-tv-channels' ? '0' : '1' }} src={favoritLogo} className="live-tv-channel-card-favorit-box" /> : false}

        </div>
    )
}

export default memo(RenderLiveTvChannelsCard)