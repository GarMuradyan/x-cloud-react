import { useEffect, useRef } from "react"

function RenderPlayerEmogiTextsCard ({ data }) {

    const selectidTextRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            selectidTextRef.current.style.opacity = '1'
        }, 100);
    }, [data])

    return (
        <div ref={selectidTextRef} className="selectid-text">{data}</div>
    )
}

export default RenderPlayerEmogiTextsCard