import { memo } from "react"
import useKeydown from "../../../remote/useKeydown"
import { useDispatch, useSelector } from "react-redux"

function RenderPlayerEmogiButton () {

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let control = {
        isActive: currentControls == 'emogi-button',

        ok: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'player-texts'
                    }
                }
            )
        },

        left: function (e) {

        },

        right: function (e) {

        },

        up: function (e) {
        },

        down: function (e) {
            control.back()
        },

        back: () => {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'video-controls'
                    }
                }
            )
        },

    }

    useKeydown(control)

    return (
        <div style={{ opacity: currentControls == 'video-controls' || currentControls == 'emogi-button' ? 1 : 0 }} onClick={() => {
            control.ok()
        }} className={control.isActive ? "player-emogi-button-box active" : "player-emogi-button-box"}>{'😄'}</div>
    )
}

export default memo(RenderPlayerEmogiButton)