import { useDispatch, useSelector } from "react-redux";
import GET_LIVE_TV_DATA from "../requests/liveTvReq";
import { useEffect, useState } from "react";
import RenderLiveTvPage from "./liveTvPage.jsx";
import RenderLiveTvLoading from "./liveTvLoading.jsx";

function RenderLiveTv () {

    const dispatch = useDispatch()

    const liveTvData = useSelector(function (state) {
        return state.liveTvData
    })

    const [data, setData] = useState(liveTvData);

    useEffect(() => {
        if (!data) {
            const getLiveTvData = async () => {
                const response = await GET_LIVE_TV_DATA()
                dispatch(
                    {
                        type: 'CANGE_LIVETV_DATA',
                        payload: {
                            data: response
                        }
                    }
                )
                console.log(response)
                setData(response)
            }
            getLiveTvData();
        }
    }, [])

    return (
        <>{data ? <RenderLiveTvPage /> : <RenderLiveTvLoading />}</>
    )
}
export default RenderLiveTv