import { useEffect, useState } from "react"
import RenderMoviePage from "./moviePage.jsx"
import get_movies_data from "../requests/moviesReq";
import RenderMovieLoading from "./moviePageLoading.jsx";
import { useDispatch, useSelector } from "react-redux";
function RenderMovie () {

    const movieData = useSelector(function (state) {
        return state.movieData
    })

    const dispatch = useDispatch()

    const [data, setData] = useState(movieData);

    const getMovies = async () => {
        const response = await get_movies_data()
        dispatch(
            {
                type: 'CANGE_MOVIE_DATA',
                payload: {
                    data: response
                }
            }
        )
        setData(response)
    }

    useEffect(() => {
        if (!data) {
            getMovies();
        }
    }, [])

    return (
        <>{data ? <RenderMoviePage data={data} /> : <RenderMovieLoading />}</>
    )
}

export default RenderMovie