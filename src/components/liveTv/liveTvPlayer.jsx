import { memo } from "react"
import ReactPlayer from "react-player"
import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import RenderSettingsParentalCode from "../settings/settingsParentalCode.jsx"
import { liveTvLock } from "../settings/settingsConfig"
import { liveFavoriteCategory, liveTvFavorits } from "./liveTVConfig"


function RenderLievTvPlayer () {

    const livePlayerRef = useRef(null)
    const reactPlayerRef = useRef(null)

    const dispatch = useDispatch()

    const selectidChannel = useSelector(function (state) {
        return state.selectidChannel
    })
    const currentControls = useSelector(function (state) {
        return state.currentControl
    })
    const liveCategory = useSelector(function (state) {
        return state.selectidLiveCategory
    })

    const selectidLiveCategory = liveCategory ? liveCategory.channels : null
    const [showNumber, setShowNumber] = useState(false)
    const [numberTimeOut, setNumberTimeOut] = useState(null)
    const [showLocked, setShowLocked] = useState(false)
    const [key, setkey] = useState(null)
    let url = selectidChannel ? `http://xtream.in:9000/Aa6262699165AYR52/Aa52527965QGDS4256/${ selectidChannel.stream_id }` : ''
    let isIndex = 0

    if (selectidLiveCategory) {
        for (let i = 0; i < selectidLiveCategory.length; i++) {
            if (selectidLiveCategory[i] == selectidChannel) {
                isIndex = i
            }
        }
    }

    let control = {
        isActive: currentControls == 'live-tv-full-screen',

        ok: function (e) {
            if (numberTimeOut) {
                clearTimeout(numberTimeOut)
            }
            setShowNumber(true)

            const id = setTimeout(() => {
                setShowNumber(false)
            }, 2000);

            setNumberTimeOut(id)
        },

        left: function (e) {

        },

        right: function (e) {
        },

        up: function (e) {
            setkey('up')
            if (liveCategory.category_id == '-0' || liveCategory.category_id == '-1' || liveCategory.category_id == '-2') {
                isIndex + 1 > selectidLiveCategory.length - 1 ? isIndex = 0 : false
                if (liveTvLock[selectidLiveCategory[isIndex + 1].category_id]) {
                    console.log('locked')
                    setShowLocked(true)
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'settings-parental-keyboard'
                            }
                        }
                    )
                    return
                }
            }
            if (selectidLiveCategory[isIndex + 1]) {
                setkey('up')
                isIndex += 1
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `http://xtream.in:9000/Aa6262699165AYR52/Aa52527965QGDS4256/${ selectidChannel.stream_id }`
            } else {
                isIndex = 0
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `http://xtream.in:9000/Aa6262699165AYR52/Aa52527965QGDS4256/${ selectidChannel.stream_id }`
            }
            if (numberTimeOut) {
                clearTimeout(numberTimeOut)
            }
            setShowNumber(true)

            const id = setTimeout(() => {
                setShowNumber(false)
            }, 2000);

            setNumberTimeOut(id)

        },

        down: function (e) {
            setkey('down')
            if (liveCategory.category_id == '-0' || liveCategory.category_id == '-1' || liveCategory.category_id == '-2') {
                isIndex - 1 < 0 ? isIndex = selectidLiveCategory.length : false
                if (liveTvLock[selectidLiveCategory[isIndex - 1].category_id]) {
                    console.log('locked')
                    setShowLocked(true)
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'settings-parental-keyboard'
                            }
                        }
                    )
                    return
                }
            }
            if (selectidLiveCategory[isIndex - 1]) {
                setkey('down')
                isIndex -= 1
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `http://xtream.in:9000/Aa6262699165AYR52/Aa52527965QGDS4256/${ selectidChannel.stream_id }`
            } else {
                isIndex = selectidLiveCategory.length - 1
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `http://xtream.in:9000/Aa6262699165AYR52/Aa52527965QGDS4256/${ selectidChannel.stream_id }`

            }
            if (numberTimeOut) {
                clearTimeout(numberTimeOut)
            }
            setShowNumber(true)

            const id = setTimeout(() => {
                setShowNumber(false)
            }, 2000);

            setNumberTimeOut(id)
        },

        channel_up: () => {
            control.up()
        },

        channel_down: () => {
            control.down()
        },

        back: () => {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'live-tv-channels'
                    }
                }
            )
        },

        yellow: function () {
            if (selectidChannel) {
                console.log(liveFavoriteCategory)
                console.log(liveTvFavorits)
                if (liveTvFavorits[selectidChannel.stream_id]) {
                    delete liveTvFavorits[selectidChannel.stream_id]
                    for (let i = 0; i < liveFavoriteCategory.channels.length; i++) {
                        if (liveFavoriteCategory.channels[i].stream_id == selectidChannel.stream_id) {
                            liveFavoriteCategory.channels.splice(i, 1)
                        }
                    }
                } else {
                    liveTvFavorits[selectidChannel.stream_id] = true
                    liveFavoriteCategory.channels.push(selectidChannel)
                }

                console.log(liveFavoriteCategory)
                console.log(liveTvFavorits)
                localStorage.setItem('live-favorit', JSON.stringify(liveTvFavorits))
            }
        }
    }

    const lockedCb = () => {
        setShowLocked(false)
        if (key == 'up') {
            if (selectidLiveCategory[isIndex + 1]) {
                setkey('up')
                isIndex += 1
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `http://xtream.in:9000/Aa6262699165AYR52/Aa52527965QGDS4256/${ selectidChannel.stream_id }`
            } else {
                isIndex = 0
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `http://xtream.in:9000/Aa6262699165AYR52/Aa52527965QGDS4256/${ selectidChannel.stream_id }`
            }
            if (numberTimeOut) {
                clearTimeout(numberTimeOut)
            }
            setShowNumber(true)

            const id = setTimeout(() => {
                setShowNumber(false)
            }, 2000);

            setNumberTimeOut(id)
        } else {
            if (selectidLiveCategory[isIndex - 1]) {
                setkey('down')
                isIndex -= 1
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `http://xtream.in:9000/Aa6262699165AYR52/Aa52527965QGDS4256/${ selectidChannel.stream_id }`
            } else {
                isIndex = selectidLiveCategory.length - 1
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `http://xtream.in:9000/Aa6262699165AYR52/Aa52527965QGDS4256/${ selectidChannel.stream_id }`

            }
            if (numberTimeOut) {
                clearTimeout(numberTimeOut)
            }
            setShowNumber(true)

            const id = setTimeout(() => {
                setShowNumber(false)
            }, 2000);

            setNumberTimeOut(id)
        }

        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'live-tv-full-screen'
                }
            }
        )

    }

    const lockedOnClose = () => {
        setShowLocked(false)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'live-tv-full-screen'
                }
            }
        )
    }

    useKeydown(control)

    return (
        <div ref={livePlayerRef} style={{ top: control.isActive ? '0' : false, left: control.isActive ? '0' : false, width: control.isActive ? '100%' : false, height: control.isActive ? '100vh' : false }} className="live-tv-player-box">

            <ReactPlayer ref={reactPlayerRef} url={url} controls={false} playing={true} width={'100%'} height={'100%'} onBuffer={() => {
                console.log('wait')
            }} />

            {control.isActive && showNumber ? <div className="live-tv-player-info-box">
                <div className="live-tv-player-num-box">{isIndex + 1}</div>
                <div className="live-tv-player-name-box">{selectidLiveCategory[isIndex].name}</div>
            </div> : false}

            {showLocked ? <RenderSettingsParentalCode cb={lockedCb} onClose={lockedOnClose} type={''} /> : false}

        </div>
    )
}

export default memo(RenderLievTvPlayer)