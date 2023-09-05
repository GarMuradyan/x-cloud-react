import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import RenderLiveTvCategories from "./liveTvCategoreis.jsx"
import RenderLiveTvChannels from "./liveTvChannels.jsx"
import words from "../settings/words.js"

function RenderLiveTvCategoriesAndChannels () {

    const dispatch = useDispatch()

    const liveTvData = useSelector(function (state) {
        return state.liveTvData
    })

    const [categories, channels] = liveTvData

    const [selectidCategory, setSelectidCategory] = useState(categories[1])

    let category_name = selectidCategory.category_name

    let trimmed_category_name = category_name.replace(/⭐️/g, '');

    dispatch(
        {
            type: 'CHANGE_SELECTID_LIVE_CATEGORY',
            payload: {
                liveCategory: selectidCategory
            }
        }
    )

    dispatch(
        {
            type: 'CHANGE_LIVETV_ALL_CHANNELS',
            payload: {
                channels: channels
            }
        }
    )

    return (
        <div className="live-tv-categories-and-channels-box">

            <div className="live-tv-title-box">{words[localStorage.getItem('language')][category_name.toLowerCase()] || category_name}</div>

            <div className="live-tv-categories-and-channels-content-box">

                <RenderLiveTvCategories category={categories} changeCategory={setSelectidCategory} />

                <RenderLiveTvChannels />

            </div>

        </div>
    )
}

export default RenderLiveTvCategoriesAndChannels