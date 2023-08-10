import { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";

function RenderLiveTvClock () {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formattedTime = currentTime.toLocaleTimeString();

    return (
        <div className="live-tv-clock-box">
            <p className="live-tv-clock">{formattedTime}</p>
        </div>
    );
}

export default memo(RenderLiveTvClock)