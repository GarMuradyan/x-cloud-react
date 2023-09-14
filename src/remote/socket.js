import { useNavigate } from "react-router-dom"
import { socket } from "../App"

export const events = {
    disconnect: "disconnect",
    connection: "connection",
    inviteRequest: "inviteRequest",
    acceptInviteRequest: "acceptInviteRequest",
    declineInviteRequest: "declineInviteRequest",
    openRoom: "openRoom",
    leaveRoom: "leaveRoom",
    closeRoom: "closeRoom",
    playerEvent: "playerEvent"
}

export const playerEvents = {
    setupDataSource: "setupDataSource",
    play: "play",
    pause: "pause",
    seekTo: "seek",
    loading: "loading",
    finished: "finshed",
    reaction: "reaction",
    loadingFinished: "loadingFinished",
    videoContinue: "videoContinue",
    infoState: "infoState",
    timeUpdate: "timeUpdate",
    clearInterval: "clearInterval"
}

export const sendPlayerEvent = (event, data) => {
    socket.emit(events.playerEvent, { event, data })
}