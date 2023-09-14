import keyboard from "./keyboardConfig";
import '../../css/keyboard.css'
import { useDispatch, useSelector } from "react-redux";
import useKeydown from "../../remote/useKeydown";
import { useState } from "react";
import { memo } from "react";
import { useLocation } from "react-router-dom";

function RenderKeyboard ({ onClose, setValue, value, setFilterData, movies, keyboardClose }) {

    const dispatch = useDispatch()
    const location = useLocation()

    const searchListt = useSelector(function (state) {
        return state.searchList
    })
    const currentControls = useSelector(function (state) {
        return state.currentControl
    })

    function lowerCase () {
        for (let i = 0; i < keyboard.length; i++) {
            for (let j = 0; j < keyboard[i].length; j++) {
                if (keyboard[i][j].type === 'basic') {
                    keyboard[i][j].key = keyboard[i][j].key.toLocaleLowerCase()
                }
            }
        }
    }

    function upperCase () {
        for (let i = 0; i < keyboard.length; i++) {
            for (let j = 0; j < keyboard[i].length; j++) {
                if (keyboard[i][j].type === 'basic') {
                    keyboard[i][j].key = keyboard[i][j].key.toLocaleUpperCase()
                }
            }
        }
    }

    let searchList = []
    const [vodsList, setVodsList] = useState(searchListt)
    let [isIndex, setIsIndex] = useState(0)
    let [isRowIndex, setIsRowIndex] = useState(0)
    const [shift, setShift] = useState(false)

    const keyboardClick = (data, index) => {

        switch (data.type) {
            case 'basic':
                basicClick(data, index)
                break;

            case 'close':
                closeClick()
                break;

            case 'space':
                setValue(value + ' ')
                break;

            case 'done':
                doneClick()
                break;

            case 'shift':
                shiftClick()
                break;
        }

    }

    const basicClick = (data, index) => {
        setValue(value + data.key)
        console.log(location)
        if (location.pathname == "/search") {
            for (var i = 0; i < movies.length; i++) {
                if (movies[i].name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    searchList.push(movies[i])
                }
            }
            setVodsList(searchList)
            setFilterData(searchList)
        }
    }

    const closeClick = (data, index) => {
        let x = value.substring(0, value.length - 1)
        setValue(x)
        if (location.pathname == "/search") {

            for (var i = 0; i < movies.length; i++) {
                if (movies[i].name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    searchList.push(movies[i])
                }
            }
            setVodsList(searchList)
            setFilterData(searchList)
        }
    }

    const shiftClick = () => {
        if (shift) {
            lowerCase()
            setShift(false)
        } else {
            upperCase()
            setShift(true)
        }
    }

    const doneClick = () => {
        if (location.pathname == "/search") {
            if (vodsList.length) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'movies-search-list'
                        }
                    }
                )
            } else {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'search-back'
                        }
                    }
                )
            }
        }
    }

    let control = {
        isActive: currentControls == 'keyboard',

        ok: function (e) {
            keyboardClick(keyboard[isRowIndex][isIndex])
        },

        left: function (e) {
            if (isIndex > 0) {
                setIsIndex(isIndex -= 1)
            }
        },

        right: function (e) {
            if (isIndex < keyboard[isRowIndex].length - 1) {
                setIsIndex(isIndex += 1)
            }
        },

        up: function (e) {

            if (isRowIndex == 0) {
                if (location.pathname == "/search") {
                    if (vodsList.length) {
                        dispatch(
                            {
                                type: 'CHANGE_CONTROLS',
                                payload: {
                                    name: 'movies-search-list'
                                }
                            }
                        )
                    } else {
                        dispatch(
                            {
                                type: 'CHANGE_CONTROLS',
                                payload: {
                                    name: 'search-back'
                                }
                            }
                        )
                    }
                } else {
                    dispatch(
                        {
                            type: 'CHANGE_CONTROLS',
                            payload: {
                                name: 'login-items'
                            }
                        }
                    )
                    onClose()
                }
            }

            if (isRowIndex == 3 && isIndex == 8) {
                setIsRowIndex(isRowIndex -= 1)
                setIsIndex(11)
                return
            }

            if (isRowIndex > 0) {
                setIsRowIndex(isRowIndex -= 1)
            }
        },

        down: function (e) {

            if (isRowIndex == 2 && isIndex > 10 && isIndex < 13) {
                setIsRowIndex(isRowIndex += 1)
                setIsIndex(8)
                return
            }

            if (isRowIndex == 2 && isIndex == 10) {
                setIsRowIndex(isRowIndex += 1)
                setIsIndex(7)
                return
            }

            if (isRowIndex == 2 && isIndex > 5 && isIndex < 10) {
                setIsRowIndex(isRowIndex += 1)
                setIsIndex(5)
                return
            }

            if (isRowIndex < keyboard.length - 1) {
                setIsRowIndex(isRowIndex += 1)
            }

        },

        back: () => {
            onClose()
        }
    }

    useKeydown(control)

    return (
        <div className="keyboard-box">

            {keyboard.map((arr, row) => {

                return (
                    <div key={row} className="keyboard-row-box">

                        {arr.map((val, i) => {

                            return (
                                <div key={i} style={{ width: val.width ? val.width : '7.9rem' }} className={isIndex == i && isRowIndex == row && control.isActive ? "keyboard-row-item-box active" : 'keyboard-row-item-box'} onClick={() => {

                                    keyboardClick(val, i)

                                }} onMouseMove={() => {
                                    dispatch(
                                        {
                                            type: 'CHANGE_CONTROLS',
                                            payload: {
                                                name: 'keyboard'
                                            }
                                        }
                                    )
                                    setIsIndex(i)
                                    setIsRowIndex(row)
                                }}>{val.key}

                                    {val.poster ? <img style={{ width: val.imgWidth ? val.imgWidth : false, height: val.imgHeight ? val.imgHeight : false }} className="keyboard-item-img-box" src={val.poster} /> : false}

                                </div>
                            )

                        })}

                    </div>
                )

            })}

        </div>
    )
}

export default memo(RenderKeyboard)