import { memo } from "react";
import { useSelector } from "react-redux";

function RenderLiveTvCategoriesCard ({ data, isActive, index }) {


    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let category_name = data.category_name;

    let trimmed_category_name = category_name.replace(/⭐️/g, '');

    return (
        <div style={{ top: index * 95 + 'px' }} className={isActive ? "live-tv-categories-card-box active" : "live-tv-categories-card-box"}>{currentControls == 'live-tv-categories' ? data.category_name : data.category_name[0]}</div>
    )
}

export default memo(RenderLiveTvCategoriesCard)