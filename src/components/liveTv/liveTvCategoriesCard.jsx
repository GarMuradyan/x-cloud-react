import { memo } from "react";
import { useSelector } from "react-redux";
import { liveTvLock } from "../settings/settingsConfig";
import lockPng from "../../images/lock.png"
import words from "../settings/words";

function RenderLiveTvCategoriesCard ({ data, isActive, index }) {


    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let category_name = data.category_name;

    let trimmed_category_name = category_name.replace(/⭐️/g, '');

    let name = words[localStorage.getItem('language')][data.category_name.toLowerCase()] || data.category_name

    return (
        <div style={{ top: index * 95 + 'px' }} className={isActive ? "live-tv-categories-card-box active" : "live-tv-categories-card-box"}>
            <div className="live-tv-categories-card-name-box">{currentControls == 'live-tv-categories' ? name : name[0]}</div>
            {liveTvLock[data.category_id] ? <img style={{ opacity: currentControls !== 'live-tv-categories' ? '0' : '1' }} className="live-tv-categories-card-lock-box" src={lockPng} /> : false}
        </div>
    )
}

export default memo(RenderLiveTvCategoriesCard)