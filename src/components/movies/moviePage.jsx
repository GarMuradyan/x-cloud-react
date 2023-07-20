import { useState } from 'react';
import '../../css/movies.css'
import RenderMovieLeft from './moviePageLeft.jsx';
import RenderMovieVods from './moviePageVods.jsx';
import { useSelector } from 'react-redux';

function RenderMoviePage ({ data }) {
    const selectidCategory = useSelector(function (state) {
        return state.selectidCategory
    })
    const [categories, movies] = data
    const [selectidCategories, setSelectidCategories] = useState(selectidCategory)

    return (
        <div className="movie-page-box">

            <RenderMovieLeft data={data} setSelectidCategories={setSelectidCategories} />
            <RenderMovieVods category={categories[selectidCategories].movies} />

        </div>
    )
}

export default RenderMoviePage