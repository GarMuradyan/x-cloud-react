import { memo } from "react"
import ReactPlayer from "react-player";
import RenderMoviePlayerControls from "./moviePlayerControls.jsx";
import useKeydown from "../../../remote/useKeydown.js";
import { useDispatch, useSelector } from "react-redux";

function RenderMoviePlayerPage (props) {

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })


    let control = {
        isActive: currentControls == 'movie-player',

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
            props.onClose()
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'movie-info-episodes'
                    }
                }
            )
        }
    }

    useKeydown(control)

    console.log(props);

    return (
        <div className="movie-player-page-box">

            <video className="movie-player-video" src={props.src} controls={false} autoPlay={true} onPlaying={() => {
                console.log('play')
            }} />

            <RenderMoviePlayerControls />

        </div>
    )
}


export default memo(RenderMoviePlayerPage)