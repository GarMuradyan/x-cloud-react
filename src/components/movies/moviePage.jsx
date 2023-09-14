import { useState } from 'react';
import '../../css/movies.css'
import RenderMovieLeft from './moviePageLeft.jsx';
import RenderMovieVods from './moviePageVods.jsx';
import { useDispatch, useSelector } from 'react-redux';

function RenderMoviePage ({ data }) {

    const dispatch = useDispatch()

    const selectidCategory = useSelector(function (state) {
        return state.selectidCategory
    })

    const [categories, movies] = data
    const [selectidCategories, setSelectidCategories] = useState(selectidCategory)

    dispatch(
        {
            type: 'CHANGE_SELECTID_CATEGORY_ID',
            payload: {
                categoryId: categories[selectidCategories].category_id
            }
        }
    )

    return (
        <div className="movie-page-box">

            <RenderMovieLeft data={data} setSelectidCategories={setSelectidCategories} />
            <RenderMovieVods category={categories[selectidCategories].movies} movies={categories[selectidCategories]} />

        </div>
    )
}

export default RenderMoviePage