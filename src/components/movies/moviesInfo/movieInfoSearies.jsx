import { useState } from "react";
import RenderMovieInfoSeasonButtons from "./movieInfoSeasonButtons.jsx";
import RenderMovieInfoEpisodes from "./movieInfoEpisodes.jsx";

function RenderMovieInfoSearies ({ onClose, infoData, type }) {
    console.log(infoData);

    const seasons = Object.values(infoData.episodes)

    const [selectidSeason, setSelectidSeason] = useState(0)

    return (
        <div className="movie-info-series-box">

            <RenderMovieInfoSeasonButtons onClose={onClose} seasons={seasons} setSelectidSeason={setSelectidSeason} />
            <RenderMovieInfoEpisodes onClose={onClose} type={type} season={seasons[selectidSeason]} />

        </div>
    )
}


export default RenderMovieInfoSearies