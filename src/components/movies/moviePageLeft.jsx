import '../../css/movies.css'
import RenderMovieBackSearch from './moviePageBackSearch.jsx'
import RenderMovieCategories from './moviePageCategories.jsx'

function RenderMovieLeft ({ data, setSelectidCategories }) {

    const [category, movies] = data

    return (
        <div className="movie-left-box">

            <RenderMovieBackSearch movies={movies} />
            <RenderMovieCategories category={category} setSelectidCategories={setSelectidCategories} />

        </div>
    )
}

export default RenderMovieLeft