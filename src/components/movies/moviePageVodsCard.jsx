import { useEffect, useRef, useState } from "react"
import notFound from "../../images/notFound.png"
import favorit from "../../images/favorit.png"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { memo } from "react"

function RenderMovieVodsCard ({ data, isActive, similar, close, type, index }) {
    console.log(type);
    const [image, setImage] = useState(notFound)

    const navigate = useNavigate()

    useEffect(() => {
        setImage(data.cover || data.stream_icon)
    }, [data])

    const dispatch = useDispatch()

    const cardClick = (e) => {

        dispatch(
            {
                type: 'CHANGE_SELECTID_MOVIE',
                payload: {
                    movie: data
                }
            }
        )

        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movie-info-loading'
                }
            }
        )

        const stateData = {
            priviusControl: close,
            type: type,
            id: data.stream_id || data.series_id,
            similar: similar
        }

        console.log(stateData);

        navigate('/vod_info', { state: stateData })

    }

    return (
        <div onClick={cardClick} style={{ left: index * 352 + 'px' }} className={isActive ? "movie-vods-card-box active" : "movie-vods-card-box"}>

            <img className="movie-vods-card-poster" src={data.cover || data.stream_icon || notFound} placeholder="blur" onError={(e) => {
                e.target.src = notFound
            }}

                onLoad={() => {
                    console.log('load')
                }} />

            <p className="movie-vods-card-name">{data.name}</p>

            {image !== notFound ? <div className="movie-vods-card-gradient"></div> : false}

            {data.favorit ? <img className="movie-vods-card-favorit" src={favorit} /> : false}

        </div>
    )
}

export default memo(RenderMovieVodsCard)