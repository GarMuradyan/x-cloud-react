import { useEffect, useState } from "react";
import useKeydown from "../../remote/useKeydown";
import RenderMoviesCategoriesCard from "./moviePageCategoriesCard.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from 'react-dom';
import { useRef } from "react";

function RenderMovieCategories ({ category, setSelectidCategories }) {

    const navigate = useNavigate()
    const contentRef = useRef(null)
    let [isIndex, setIsIndex] = useState(0)
    let [start, setStart] = useState(0)
    let [end, setEnd] = useState(8)
    let [selectCateg, setSelectCateg] = useState(0)
    let [transIndex, setTransIndex] = useState(0)
    const [isAnimated, setIsAnimated] = useState(true)
    const fixCategories = []
    const currentControls = useSelector(function (state) {
        return state.currentControl
    })
    const dispatch = useDispatch()

    for (let i = start; i < end; i++) {
        if (category[i]) {
            category[i].index = i
            fixCategories.push(category[i])
        }
    }

    let control = {
        isActive: currentControls == 'category',

        ok: function (e) {
            setSelectidCategories(selectCateg)
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'movies'
                    }
                }
            )

            dispatch(
                {
                    type: 'CHANGE_SELECTID_CATEGORY',
                    payload: {
                        category: selectCateg
                    }
                }
            )

            dispatch(
                {
                    type: 'CHANGE_SELECTID_CATEGORY_ID',
                    payload: {
                        categoryId: fixCategories[isIndex].category_id
                    }
                }
            )
        },

        left: function (e) {

        },

        right: function (e) {
            dispatch(
                {
                    type: 'CHANGE_CONTROLS',
                    payload: {
                        name: 'movies'
                    }
                }
            )
        },

        up: function (e) {

            if (isIndex == 0) {
                dispatch(
                    {
                        type: 'CHANGE_CONTROLS',
                        payload: {
                            name: 'search-button'
                        }
                    }
                )
            }

            if (isIndex > 0) {
                if (isAnimated) {
                    setIsIndex(isIndex -= 1)
                    setSelectCateg(selectCateg -= 1)
                    if (isIndex < 3 && end !== 8) {
                        setTransIndex(transIndex -= 1)
                        setIsAnimated(false)
                        setTimeout(() => {
                            setIsAnimated(true)
                            setIsIndex(3)
                            setStart(start -= 1)
                            setEnd(end -= 1)
                        }, 100);
                    }
                }

            }
        },

        down: function (e) {
            if (isIndex < fixCategories.length - 1) {
                if (isAnimated) {
                    setIsIndex(isIndex += 1)
                    setSelectCateg(selectCateg += 1)
                    if (isIndex > 3 && end < category.length) {
                        setTransIndex(transIndex += 1)
                        setIsAnimated(false)
                        console.log(isAnimated);
                        setTimeout(() => {
                            setIsAnimated(true)
                            console.log(isAnimated);
                            setIsIndex(3)
                            setStart(start += 1)
                            setEnd(end += 1)
                        }, 100);
                    }
                }
            }
        },

        back: () => {
            navigate('/menu')
        }

    }

    useKeydown(control)

    return (
        <div className="movie-categories-box">

            <div ref={contentRef} style={{ transform: 'translateY(' + (- transIndex * 112) + 'px)' }} className="movie-categories-content-box">

                {fixCategories.map((val, i) => {

                    return (
                        <RenderMoviesCategoriesCard key={i} data={val} isActive={isIndex == i && control.isActive} setSelectidCategories={setSelectidCategories} index={val.index} />
                    )

                })}

            </div>

        </div>
    )
}

export default RenderMovieCategories