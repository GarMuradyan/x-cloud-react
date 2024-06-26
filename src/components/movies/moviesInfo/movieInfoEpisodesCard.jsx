import { useDispatch, useSelector } from 'react-redux';
import notFound from '../../../images/Logo.png'
import { memo, useEffect, useRef } from 'react';
import Portal from '../../portal.jsx';
import RenderMoviePlayerPage from '../moviePlayer/moviePlayer.jsx'
import { useState } from 'react';

function RenderMovieInfoEpisodesCard ({ data, type, isActive, index }) {

    const imgRef = useRef(null)

    let continueWatching = localStorage.getItem('series-continue') ? JSON.parse(localStorage.getItem('series-continue')) : {}
    let originalSrc = data.info.movie_image
    const poster = originalSrc ? `https://image.tmdb.org/t/p/w200/${ originalSrc.split("/").pop() }` : notFound

    useEffect(() => {
        setTimeout(() => {
            if (imgRef.current) {
                imgRef.current.style.opacity = '1'
            }
        }, 100);
    }, [data])


    console.log(poster)

    return (
        <div className={isActive ? "movie-info-episodes-card-box active" : "movie-info-episodes-card-box"} style={{ left: index * 53 + 'rem' }}>

            <img ref={imgRef} style={{ objectFit: data.info.movie_image ? 'cover' : 'contain' }} className="movie-info-episodes-poster-box" src={data.info.movie_image || notFound} onError={(e) => {
                e.target.src = notFound
                e.target.style.objectFit = 'contain'
            }} />

            <div style={{ opacity: isActive ? '1' : '0' }} className="movie-info-episodes-name-box">{data.title}</div>

            <div style={{ opacity: isActive ? '1' : '0' }} className='movie-info-episodes-num-box'>Episode {index + 1}</div>

            <div className="movie-info-episodes-gradient-box"></div>

            {continueWatching[data.id] && continueWatching[data.id].progresBar ? <div className='movie-info-episodes-progres-box'>
                <div style={{ width: continueWatching[data.id].progresBar }} className='movie-info-episodes-progresbar-box'></div>
            </div> : false}

        </div>
    )
}

export default memo(RenderMovieInfoEpisodesCard)