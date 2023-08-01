import { useState } from "react"
import RenderMovieSearchHeader from "./movieSearchHeader.jsx";
import RenderKeyboard from "../../keyboard/keyboard.jsx";
import RenderMovieSearchVodsList from "./movieSearchVodsList.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

function RenderMovieSearch () {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const inputValue = useSelector(function (state) {
        return state.searchInputValue
    })

    const searchList = useSelector(function (state) {
        return state.searchList
    })

    const [value, setValue] = useState(inputValue)
    const [filterData, setFilterData] = useState(searchList)
    const location = useLocation()
    const type = location.state
    const vods = useSelector(function (state) {
        if (type.type == 'series') {
            return state.seriesData
        } else {
            return state.movieData
        }
    })

    dispatch(
        {
            type: 'CHANGE_SEARCH_INPUT_VALUE',
            payload: {
                value: value
            }
        }
    )

    dispatch(
        {
            type: 'CHANGE_SEARCH_LIST',
            payload: {
                list: filterData
            }
        }
    )

    const onClose = useCallback(() => {
        if (type.type == 'series') {
            navigate('/series')
        } else {
            navigate('/movie')
        }
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movies'
                }
            }
        )
    }, [])

    let fixList = []

    for (let i = 0; i < 15; i++) {
        if (filterData[i]) {
            fixList.push(filterData[i])
        }
    }

    return (
        <div className="movie-search-page-box">

            <RenderMovieSearchHeader value={value} onCLose={onClose} searchList={fixList} />

            {filterData.length ? <RenderMovieSearchVodsList movies={fixList} onClose={onClose} type={type} /> : false}

            <div className="movie-search-keyboard-box">

                <RenderKeyboard onClose={onClose} setValue={setValue} value={value} setFilterData={setFilterData} movies={vods[1]} />

            </div>

        </div>
    )
}

export default RenderMovieSearch