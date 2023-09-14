import { memo, useEffect, useRef, useState } from "react"
import '../../css/group.css'
import useKeydown from "../../remote/useKeydown"
import { useSelector } from "react-redux"

function RenderGroupWatching (props) {

    const groupParentRef = useRef(null)

    const data = [{ name: 'Create Room', type: 'Create', id: 1 }, { name: 'Join Room', type: 'Join', id: 2 }]

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let [isIndex, setIsIndex] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            if (groupParentRef.current) {
                groupParentRef.current.style.opacity = '1'
            }
        }, 0);
    }, [])


    let control = {
        isActive: currentControls == 'group-buttons',

        ok: function (e) {
        },

        left: function (e) {
            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {
            if (isIndex < data.length - 1) {
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {

        },

        down: function (e) {

        },

        back: () => {
            props.onClose()
        }
    }

    useKeydown(control)

    return (
        <div ref={groupParentRef} className="group-watching-box">

            {data.map((val, i) => {
                return (
                    <div key={val.id} className={control.isActive && i == isIndex ? "group-watching-item-box active" : "group-watching-item-box"}>{val.name}</div>
                )
            })}

        </div>
    )
}

export default memo(RenderGroupWatching)