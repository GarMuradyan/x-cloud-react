import { useDispatch, useSelector } from "react-redux"

function RenderLiveTvSearch () {

    const dispatch = useDispatch()

    const selectidLiveCategory = useSelector(function (state) {
        return state.selectidLiveCategory
    })

    const liveTvAllChannels = useSelector(function (state) {
        return state.liveTvAllChannels
    })

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })


    let control = {
        isActive: currentControls == 'live-tv-search',

        ok: function (e) {

        },

        left: function (e) {

        },

        right: function (e) {

        },

        up: function (e) {


        },

        down: function (e) {


        },

        back: () => {
        }
    }

    useKeydown(control)

    return (
        <div className=""></div>
    )
}