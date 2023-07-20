import { useEffect, useState } from "react"
import get_series_data from "../requests/seriesReq"
import RenderMoviePage from "./moviePage.jsx"
import RenderMovieLoading from "./moviePageLoading.jsx"
import { useDispatch, useSelector } from "react-redux"

function RenderSeries () {

    const seriesData = useSelector(function (state) {
        return state.seriesData
    })

    const dispatch = useDispatch()

    const [data, setData] = useState(seriesData)

    const fetchData = async () => {
        const response = await get_series_data()
        dispatch(
            {
                type: 'CANGE_SERIES_DATA',
                payload: {
                    data: response
                }
            }
        )
        setData(response)
    }

    useEffect(() => {
        if (!data) {
            fetchData()
        }

    }, [])


    return (
        <>{data ? <RenderMoviePage data={data} /> : <RenderMovieLoading />}</>
    )
}

export default RenderSeries