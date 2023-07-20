function RenderMoviesCategoriesCard ({ data, isActive, setSelectidCategories, index, selectid }) {

    let category_name = data.category_name;

    let trimmed_category_name = category_name.replace(/⭐️/g, '');

    return (
        <div style={{ top: index * 112 + 'px' }} className={isActive ? 'movie-categories-card-box active' : 'movie-categories-card-box'} onClick={() => {
            setSelectidCategories(index)
        }}>{trimmed_category_name}</div>
    )
}

export default RenderMoviesCategoriesCard