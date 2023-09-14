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
import { playerEvents, sendPlayerEvent } from "../../../remote/socket.js";

function RenderMovieInfoPage () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const infoRef = useRef(null)

    let backgroundImage = null
    let state

    const infoPageState = useSelector(function (state) {
        return state.infoPageState
    })

    if (infoPageState) {
        state = infoPageState
    } else {
        state = location.state
    }

    const [infoData, setInfoData] = useState(null)
    const [loadingInfo, setLoadingInfo] = useState({})
    const [similarMovies, setSimilarMovies] = useState(state.similar)

    if (infoData) {
        if (state.type == 'series') {
            backgroundImage = infoData.info.backdrop_path[0] || infoData.info.cover
        } else {
            backgroundImage = infoData.info.movie_image
        }
    }

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
        dispatch(
            {
                type: 'CHANGE_INFO_STATE',
                payload: {
                    infoPageState: false
                }
            }
        )
    }

    const test = e => {
        e.stopPropagation();
    }

    setTimeout(() => {
        if (infoRef.current) {
            infoRef.current.style.opacity = '1'
        }
    }, 50);

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

            if (infoPageState !== state) {
                if (data.info) {
                    console.log(data, 'info-data===========')
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'movie-info-buttons'
                            }
                        }
                    )
                }
            }
            if (data.info) {
                setInfoData(data)
            } else {
                onClose()
            }

        }, state.type)

        setLoadingInfo(onAbort)

    }, [state])

    return (
        <>{infoData ? <div ref={infoRef} style={{ backgroundImage: 'url(' + backgroundImage + ')' }} className="movie-info-page-box" onClick={test}>

            <div className="movie-info-left-gradient" ></div>

            <div className="movie-info-bottom-gradient"></div>

            <RenderMovieInfoContent data={infoData} onClose={onClose} type={state.type} similar={similarMovies} setSimilarMovies={setSimilarMovies} infoPageState={state} />

            {state.type == 'movie' ? <RenderMovieInfoSimilarVods similar={similarMovies} onClose={onClose} type={state.type} close={state.priviusControl} /> : <RenderMovieInfoSearies onClose={onClose} infoData={infoData} type={state.type} infoPageState={state} />}

        </div> : <RenderInfoLoading onAbort={loadingInfo.onAbort} onClose={loadingInfo.onClose} />}</>

    )
}

export default memo(RenderMovieInfoPage)