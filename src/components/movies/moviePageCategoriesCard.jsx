import { useSelector } from "react-redux";

function RenderMoviesCategoriesCard ({ data, isActive, setSelectidCategories, index }) {

    const selectidCategoryId = useSelector(function (state) {
        return state.selectidCategoryId
    })

    let category_name = data.category_name;

    let trimmed_category_name = category_name.replace(/⭐️/g, '');

    return (
        <div style={{ top: index * 112 + 'px', backgroundColor: data.category_id == selectidCategoryId ? 'rgba(62, 255, 14, 0.74)' : 'rgba(30, 31, 32, 0.45)' }} className={isActive ? 'movie-categories-card-box active' : 'movie-categories-card-box'} onClick={() => {
            setSelectidCategories(index)
        }}>{trimmed_category_name}</div>
    )
}

export default RenderMoviesCategoriesCard