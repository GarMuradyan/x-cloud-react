import { memo } from "react";
import RenderLiveTvMenuBox from "./liveTvMenuBox.jsx";
import RenderLievTvPlayer from "./liveTvPlayer.jsx";

function RenderLiveTvPrograms () {
    return (
        <div className="live-tv-programs-box">

            <RenderLiveTvMenuBox />

            <RenderLievTvPlayer />

        </div>
    )
}

export default memo(RenderLiveTvPrograms)