import { useDispatch, useSelector } from 'react-redux';
import notFound from '../../../images/episodeNotFound.png'
import { memo } from 'react';
import Portal from '../../portal.jsx';
import RenderMoviePlayerPage from '../moviePlayer/moviePlayer.jsx'
import { useState } from 'react';

function RenderMovieInfoEpisodesCard ({ data, type, isActive }) {
    console.log('render-episodes');
    console.log(data);

    const [showPlayer, setShowPlayer] = useState(false)
    const dispatch = useDispatch()

    const cardClick = () => {
        console.log(data);
        setShowPlayer(true)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movie-player'
                }
            }
        )
    }

    const playerInfo = {
        src: `http://diblax.spartacus.site/series/WOYQyy5YzT/2WawEOAw0d/${ data.id }.${ data.container_extension }`,
        onClose: () => {
            setShowPlayer(false)
        }
    }

    return (
        <div className={isActive ? "movie-info-episodes-card-box active" : "movie-info-episodes-card-box"} onClick={cardClick}>

            <img className="movie-info-episodes-poster-box" src={data.info.movie_image || notFound} />

            <div className="movie-info-episodes-name-box">{data.title}</div>

            <div className="movie-info-episodes-gradient-box"></div>

            {showPlayer ? <Portal element={<RenderMoviePlayerPage {...playerInfo} />}></Portal> : false}

        </div>
    )
}

export default memo(RenderMovieInfoEpisodesCard)