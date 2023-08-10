import { memo } from "react"
import ReactPlayer from "react-player"
import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"


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

    let url = selectidChannel ? `https://globoplay.one/2452366/8950273/${ selectidChannel.stream_id }` : ''

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
            if (selectidLiveCategory[isIndex + 1]) {
                isIndex += 1
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `https://globoplay.one/2452366/8950273/${ selectidChannel.stream_id }`
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
                url = `https://globoplay.one/2452366/8950273/${ selectidChannel.stream_id }`
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
            if (selectidLiveCategory[isIndex - 1]) {
                isIndex -= 1
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `https://globoplay.one/2452366/8950273/${ selectidChannel.stream_id }`
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
                url = `https://globoplay.one/2452366/8950273/${ selectidChannel.stream_id }`

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
            if (selectidLiveCategory[isIndex + 1]) {
                isIndex += 1
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `https://globoplay.one/2452366/8950273/${ selectidChannel.stream_id }`
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
                url = `https://globoplay.one/2452366/8950273/${ selectidChannel.stream_id }`
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

        channel_down: () => {
            if (selectidLiveCategory[isIndex - 1]) {
                isIndex -= 1
                dispatch(
                    {
                        type: 'CHANGE_SELECTID_CHANNEL',
                        payload: {
                            channel: selectidLiveCategory[isIndex]
                        }
                    }
                )
                url = `https://globoplay.one/2452366/8950273/${ selectidChannel.stream_id }`
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
                url = `https://globoplay.one/2452366/8950273/${ selectidChannel.stream_id }`

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

        back: () => {
            dispatch(
                {
                    type: 'CHANGE_IS_FULL_SCREEN',
                    payload: {
                        isFullScreen: false
                    }
                }
            )

            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'live-tv-channels'
                    }
                }
            )
        }
    }

    useKeydown(control)

    return (
        <div ref={livePlayerRef} style={{ top: control.isActive ? '0' : false, left: control.isActive ? '0' : false, width: control.isActive ? '100%' : false, height: control.isActive ? '100vh' : false }} className="live-tv-player-box">

            <ReactPlayer ref={reactPlayerRef} url={url} controls={false} playing={true} width={'100%'} height={'100%'} onBuffer={() => {
                console.log('wait')
            }} />

            {control.isActive && showNumber ? <div className="live-tv-player-num-box">{isIndex + 1}</div> : false}
            {control.isActive && showNumber ? <div className="live-tv-player-name-box">{selectidLiveCategory[isIndex].name}</div> : false}

        </div>
    )
}

export default memo(RenderLievTvPlayer)