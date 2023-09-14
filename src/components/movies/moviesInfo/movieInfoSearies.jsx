import { useState } from "react";
import RenderMovieInfoSeasonButtons from "./movieInfoSeasonButtons.jsx";
import RenderMovieInfoEpisodes from "./movieInfoEpisodes.jsx";

function RenderMovieInfoSearies ({ onClose, infoData, type, infoPageState }) {

    const seasons = Object.values(infoData.episodes)
    console.log(seasons)
    console.log(infoData)

    const [selectidSeason, setSelectidSeason] = useState(0)

    return (
        <div className="movie-info-series-box">

            <RenderMovieInfoSeasonButtons onClose={onClose} seasons={seasons} setSelectidSeason={setSelectidSeason} />
            <RenderMovieInfoEpisodes onClose={onClose} type={type} season={seasons[selectidSeason]} infoPageState={infoPageState} />

        </div>
    )
}


export default RenderMovieInfoSearies