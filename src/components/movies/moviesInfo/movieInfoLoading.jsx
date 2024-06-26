import { useDispatch, useSelector } from "react-redux";
import RenderLoadingBox from "../../loading.jsx";
import useKeydown from "../../../remote/useKeydown.js";

function RenderInfoLoading ({ onAbort, onClose }) {
    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let control = {
        isActive: currentControls == 'movie-info-loading',

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
            if (onAbort && onClose) {
                onAbort.abort()
                onClose()
            }
        }
    }

    useKeydown(control)
    return (
        <div className="info-loading-box">

            <div className="info-loading-content">

                <RenderLoadingBox />

            </div>

        </div>
    )
}

export default RenderInfoLoading