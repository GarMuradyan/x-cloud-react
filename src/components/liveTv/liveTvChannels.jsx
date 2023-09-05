import { useDispatch, useSelector } from "react-redux"
import useKeydown from "../../remote/useKeydown"
import { useNavigate } from "react-router-dom"
import { memo, useEffect, useState } from "react"
import RenderLiveTvChannelsCard from "./liveTvChannelsCard.jsx"
import { liveTvLock } from "../settings/settingsConfig"
import RenderSettingsParentalCode from "../settings/settingsParentalCode.jsx"
import { liveFavoriteCategory, liveTvFavorits } from "./liveTVConfig"

function RenderLiveTvChannels () {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    const selectidChannel = useSelector(function (state) {
        return state.selectidChannel
    })

    const selectidLiveCategory = useSelector(function (state) {
        return state.selectidLiveCategory
    })

    const [showLocked, setShowLocked] = useState(false)

    let [isIndex, setIsIndex] = useState(0)
    let [transIndex, setTransIndex] = useState(0)
    let [start, setStart] = useState(0)
    let [end, setEnd] = useState(30)
    const fixCategories = []

    const channels = selectidLiveCategory ? selectidLiveCategory.channels : null

    for (let i = start; i < end; i++) {
        if (channels[i]) {
            channels[i].index = i
            fixCategories.push(channels[i])
        }
    }

    useEffect(() => {
        setEnd(30)
        setStart(0)
        setTransIndex(0)
        setIsIndex(0)
    }, [selectidLiveCategory.category_id])

    const lockedOnClose = () => {
        setShowLocked(false)
        dispatch(
            {
                type: 'CHANGE_CONTROLS',
                payload: {
                    name: 'live-tv-channels'
                }
            }
        )
    }

    const lockedCb = () => {
        setShowLocked(false)
        dispatch(
            {
                type: 'CHANGE_SELECTID_CHANNEL',
                payload: {
                    channel: fixCategories[isIndex]
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

    let control = {
        isActive: currentControls == 'live-tv-channels',

        ok: function (e) {
            console.log(fixCategories[isIndex])
            if (fixCategories[isIndex] !== selectidChannel) {
                if (selectidLiveCategory.category_id == '-0' || selectidLiveCategory.category_id == '-1' || selectidLiveCategory.category_id == '-2') {
                    if (liveTvLock[fixCategories[isIndex].category_id]) {
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
            }
            dispatch(
                {
                    type: 'CHANGE_SELECTID_CHANNEL',
                    payload: {
                        channel: fixCategories[isIndex]
                    }
                }
            )
            if (fixCategories[isIndex] == selectidChannel) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'live-tv-full-screen'
                        }
                    }
                )
                console.log('full-screen')
            }
        },

        left: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'live-tv-categories'
                    }
                }
            )
        },

        right: function (e) {
            control.yellow()
            console.log(selectidChannel)
        },

        up: function (e) {

            if (isIndex >= 0) {
                if (channels.length > 30) {
                    if (isIndex < fixCategories.length - 4) {
                        if (transIndex !== 0) {
                            setTransIndex(transIndex -= 1)
                        }
                    }
                    setIsIndex(isIndex -= 1)
                    if (isIndex < 0) {
                        setEnd(channels.length)
                        setStart(channels.length - 30)
                        setIsIndex(fixCategories.length - 1)
                        setTransIndex(channels.length - 10)
                        console.log(isIndex)
                    }
                    if (isIndex < 15 && end !== 30) {
                        setIsIndex(15)
                        setStart(start -= 1)
                        setEnd(end -= 1)
                    }
                    console.log(isIndex)
                } else {
                    if (channels.length > 10) {
                        if (transIndex !== 0) {
                            setTransIndex(transIndex -= 1)
                        }
                        setIsIndex(isIndex -= 1)
                        if (isIndex < 0) {
                            setIsIndex(fixCategories.length - 1)
                            setTransIndex(channels.length - 10)
                            console.log(isIndex)
                        }
                    } else {
                        setIsIndex(isIndex -= 1)
                        if (isIndex < 0) {
                            setIsIndex(fixCategories.length - 1)
                        }
                    }
                }

            }

        },

        down: function (e) {
            if (isIndex < fixCategories.length) {
                if (channels.length > 30) {
                    if (isIndex > 4) {
                        if (transIndex < channels.length - 10) {
                            setTransIndex(transIndex += 1)
                        }
                    }
                    setIsIndex(isIndex += 1)
                    if (isIndex > 15 && end < channels.length) {
                        setIsIndex(15)
                        setStart(start += 1)
                        setEnd(end += 1)
                    }
                    if (isIndex == fixCategories.length) {
                        setEnd(30)
                        setStart(0)
                        setIsIndex(0)
                        setTransIndex(0)
                    }
                } else {
                    if (channels.length > 10) {
                        if (transIndex < channels.length - 10) {
                            setTransIndex(transIndex += 1)
                        }
                        setIsIndex(isIndex += 1)
                        if (isIndex == fixCategories.length) {
                            setIsIndex(0)
                            setTransIndex(0)
                        }
                    } else {
                        setIsIndex(isIndex += 1)
                        if (isIndex == fixCategories.length) {
                            setIsIndex(0)
                        }
                    }
                }

            }

        },

        back: () => {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'live-tv-categories'
                    }
                }
            )
        },

        green: () => {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'live-tv-categories'
                    }
                }
            )
        },

        blue: () => {
            navigate('/menu')

            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'menu-item'
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

                dispatch(
                    {
                        type: "CHANGE_SELECTID_LIVE_CATEGORY",
                        payload: {
                            liveCategory: { ...selectidLiveCategory }
                        }
                    }
                )
                if (!selectidLiveCategory.channels.length) {
                    control.green()
                }
                console.log(liveFavoriteCategory)
                console.log(liveTvFavorits)
                localStorage.setItem('live-favorit', JSON.stringify(liveTvFavorits))
            }
        }
    }

    useKeydown(control)

    return (
        <div style={{ width: control.isActive || currentControls == 'live-tv-full-screen' ? '50rem' : '10rem' }} className="live-tv-channels-box">

            <div style={{ transform: 'translateY(' + (- transIndex * 95) + 'px)' }} className="live-tv-channels-content-box">

                {fixCategories.map((val, i) => {
                    return (
                        <RenderLiveTvChannelsCard key={val.stream_id} data={val} isActive={control.isActive && i == isIndex} index={val.index} />
                    )
                })}

            </div>

            {showLocked ? <RenderSettingsParentalCode onClose={lockedOnClose} cb={lockedCb} type={""} /> : false}

        </div>
    )
}

export default memo(RenderLiveTvChannels)