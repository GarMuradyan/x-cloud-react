import { memo } from "react";
import { useSelector } from "react-redux";

function RenderMoviesCategoriesCard ({ data, isActive, setSelectidCategories, index }) {

    const selectidCategoryId = useSelector(function (state) {
        return state.selectidCategoryId
    })

    let category_name = data.category_name;

    let trimmed_category_name = category_name.replace(/⭐️/g, '');

    return (
        <div style={{ top: index * 112 + 'px', backgroundColor: data.category_id == selectidCategoryId ? 'rgb(58, 97, 48)' : 'rgba(30, 31, 32, 0.45)' }} className={isActive ? 'movie-categories-card-box active' : 'movie-categories-card-box'} onClick={() => {
            setSelectidCategories(index)
        }}>{trimmed_category_name}</div>
    )
}

export default memo(RenderMoviesCategoriesCard)