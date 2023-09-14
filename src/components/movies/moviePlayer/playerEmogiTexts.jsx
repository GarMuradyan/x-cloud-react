import { memo, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../../remote/useKeydown"
import { socket } from "../../../App"
import { events, playerEvents, sendPlayerEvent } from "../../../remote/socket"
import Portal from "../../portal.jsx"
import RenderPlayerEmogiTextsCard from './playerEmogiTextsCard.jsx'

function RenderPlayerEmogiTexts () {

    const emogiTexts = ['Wow 😮', 'Fatality 💥', 'Hello 👋', 'By 👋']

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const [delay, setDelay] = useState(null)
    const [selectidTexts, setSelectidTexts] = useState([])
    const [showText, setShowText] = useState(false)
    let [index, setIndex] = useState(0)

    const onClose = () => {
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'movie-player'
                }
            }
        )
    }

    const onPlayerEvent = (e) => {
        switch (e.event) {
            case playerEvents.setupDataSource: {
                break;
            }
            case playerEvents.play: {
                break;
            }
            case playerEvents.pause: {
                break;
            }
            case playerEvents.loading: {
                break;
            }
            case playerEvents.loadingFinished: {
                break;
            }
            case playerEvents.reaction: {
                selectidTexts.push(emogiTexts[e.data])
                console.log(selectidTexts)
                setSelectidTexts([...selectidTexts])
                console.log(selectidTexts)
                setShowText(true)
                delay ? clearTimeout(delay) : false
                const id = setTimeout(() => {
                    selectidTexts.shift()
                    console.log(selectidTexts)
                    setSelectidTexts([...selectidTexts])
                    selectidTexts.length == 0 ? setShowText(false) : false
                }, 5000);
                setDelay(id)
                break;
            }
        }
    }

    useEffect(() => {
        socket.on(events.playerEvent, onPlayerEvent)
    }, [])

    let control = {
        isActive: currentControls == 'player-texts',

        ok: function (e) {
            sendPlayerEvent(playerEvents.reaction, index)
        },

        left: function (e) {

        },

        right: function (e) {

        },

        up: function (e) {
            if (index > 0) {
                setIndex(index -= 1)
            }
        },

        down: function (e) {
            if (index < emogiTexts.length - 1) {
                setIndex(index += 1)
            }
        },

        back: () => {
            onClose()
        },


    }

    useKeydown(control)

    return (
        <div className="player-emogi-texts-box">

            <p className="player-emogi-texts-title-box">Texts</p>

            <div className="player-emogi-texts-content-box">

                {emogiTexts.map((val, i) => {
                    return (
                        <div key={i} className={control.isActive && i == index ? "player-emogi-text-item-box active" : "player-emogi-text-item-box"}>{val}</div>
                    )
                })}

            </div>

            <Portal element={<div style={{ transform: showText ? 'translateX(0rem)' : 'translateX(-55rem)' }} className="selectid-content-text">
                {selectidTexts.map((val, i) => {
                    return (
                        <RenderPlayerEmogiTextsCard key={i} data={val} />
                    )
                })}
            </div>} />

        </div>
    )
}

export default memo(RenderPlayerEmogiTexts)