import { memo } from "react";
import { useSelector } from "react-redux";
import lockPng from '../../images/lock.png'
import { moviesLock, seriesLock } from "../settings/settingsConfig";
import words from "../settings/words";

function RenderMoviesCategoriesCard ({ data, isActive, setSelectidCategories, index }) {

    const selectidCategoryId = useSelector(function (state) {
        return state.selectidCategoryId
    })

    let category_name = data.category_name;
    let trimmed_category_name = category_name.replace(/⭐️/g, '');
    let name = words[localStorage.getItem('language')][data.category_name.toLowerCase()] || data.category_name

    return (
        <div style={{ top: index * 112 + 'px', backgroundColor: data.category_id == selectidCategoryId ? 'rgb(58, 97, 48)' : 'rgba(30, 31, 32, 0.45)' }} className={isActive ? 'movie-categories-card-box active' : 'movie-categories-card-box'} onClick={() => {
            setSelectidCategories(index)
        }}>
            <div className="movie-categories-card-name-box">{name}</div>
            {seriesLock[data.category_id] || moviesLock[data.category_id] ? <img className="movie-categories-card-lock-box" src={lockPng} /> : false}
        </div>
    )
}

export default memo(RenderMoviesCategoriesCard)