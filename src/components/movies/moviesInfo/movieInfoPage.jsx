import { useDispatch, useSelector } from "react-redux";
import RenderMovieInfoContent from "./movieInfoContentBox.jsx";
import RenderMovieInfoSimilarVods from "./movieInfoSimilarVods.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import RenderInfoLoading from "./movieInfoLoading.jsx";
import { useEffect } from "react";
import GET_INFO_DATA from "../../requests/infoReq.js";
import RenderMovieInfoSearies from "./movieInfoSearies.jsx";
import { memo } from "react";
import { useRef } from "react";

function RenderMovieInfoPage () {
    const navigate = useNavigate()

    let backgroundImage = null
    const infoRef = useRef(null)

    const [infoData, setInfoData] = useState(null)
    const [loadingInfo, setLoadingInfo] = useState({})
    const location = useLocation()
    const state = location.state
    const [similarMovies, setSimilarMovies] = useState(state.similar)

    if (infoData) {
        if (state.type == 'series') {
            backgroundImage = infoData.info.backdrop_path[0] || infoData.info.cover
        } else {
            backgroundImage = infoData.info.movie_image
        }
    }

    const dispatch = useDispatch()
    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const onClose = () => {
        if (state.priviusControl == 'keyboard') {
            const stateData = {
                type: state.type
            }
            navigate('/search', { state: stateData })
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: state.priviusControl
                    }
                }
            )
        } else if (state.priviusControl == 'movies') {
            if (state.type == 'series') {
                navigate('/series')
            } else {
                navigate('/movie')
            }
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: state.priviusControl
                    }
                }
            )
        }
    }

    useEffect(() => {

        if (infoData) {
            setInfoData(null)
        }

        const onAbort = {
            onAbort: null,
            onClose: function () {
                onClose()
            }
        }

        onAbort.onAbort = GET_INFO_DATA(state.id, function (data) {
            if (data.info) {
                if (currentControls == 'movie-info-loading') {
                    setInfoData(data)
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'movie-info-buttons'
                            }
                        }
                    )
                }
            } else {
                onClose()
            }
        }, state.type)

        setLoadingInfo(onAbort)

    }, [state])

    const test = e => {
        e.stopPropagation();
    }

    setTimeout(() => {
        if (infoRef.current) {
            infoRef.current.style.opacity = '1'
        }
    }, 50);

    return (
        <>{infoData ? <div ref={infoRef} style={{ backgroundImage: 'url(' + backgroundImage + ')' }} className="movie-info-page-box" onClick={test}>

            <div className="movie-info-left-gradient" ></div>

            <div className="movie-info-bottom-gradient"></div>

            <RenderMovieInfoContent data={infoData} onClose={onClose} type={state.type} similar={similarMovies} setSimilarMovies={setSimilarMovies} />

            {state.type == 'movie' ? <RenderMovieInfoSimilarVods similar={similarMovies} onClose={onClose} type={state.type} close={state.priviusControl} /> : <RenderMovieInfoSearies onClose={onClose} infoData={infoData} type={state.type} />}

        </div> : <RenderInfoLoading onAbort={loadingInfo.onAbort} onClose={loadingInfo.onClose} />}</>

    )
}

export default memo(RenderMovieInfoPage)