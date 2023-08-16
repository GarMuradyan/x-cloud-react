import { useDispatch, useSelector } from "react-redux"
import RenderBackButton from "../back.jsx"
import useKeydown from "../../remote/useKeydown"
import RenderSettingsLockCategoriesContent from "./settingsLockCategoriesContent.jsx"

function RenderSettingsLockCategories ({ onClose, categories }) {

    const dispatch = useDispatch()

    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    let control = {
        isActive: currentControls == 'settings-lock-categories-back',

        ok: function (e) {
            onClose()
        },

        left: function (e) {

        },

        right: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-lock-categories-items'
                    }
                }
            )

        },

        up: function (e) {


        },

        down: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'settings-lock-categories-items'
                    }
                }
            )

        },

        back: () => {
            onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="settings-lock-categories-page-box">

            <div className={control.isActive ? "settings-lock-categories-back-box active" : "settings-lock-categories-back-box"}>
                <RenderBackButton />
            </div>

            <RenderSettingsLockCategoriesContent onClose={onClose} lockCateg={categories} />

        </div>
    )
}

export default RenderSettingsLockCategories