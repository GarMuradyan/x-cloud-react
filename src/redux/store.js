import { createStore } from "redux";

const store = createStore(function (state, action) {
    if (action.type === 'CHANGE_CONTROLS') {
        return {
            ...state,
            currentControl: action.payload.name
        }
    }

    if (action.type === 'CANGE_MOVIE_DATA') {
        return {
            ...state,
            movieData: action.payload.data
        }
    }

    if (action.type === 'CANGE_SERIES_DATA') {
        return {
            ...state,
            seriesData: action.payload.data
        }

    }

    if (action.type === 'CHANGE_SEARCH_INPUT_VALUE') {
        return {
            ...state,
            searchInputValue: action.payload.value
        }

    }

    if (action.type === 'CHANGE_SEARCH_LIST') {
        return {
            ...state,
            searchList: action.payload.list
        }

    }

    if (action.type === 'CHANGE_SELECTID_MOVIE') {
        return {
            ...state,
            selectidMovie: action.payload.movie
        }

    }

    if (action.type === 'CHANGE_SELECTID_CATEGORY') {
        return {
            ...state,
            selectidCategory: action.payload.category
        }

    }

    if (action.type === 'CHANGE_SELECTID_CATEGORY_ID') {
        return {
            ...state,
            selectidCategoryId: action.payload.categoryId
        }

    }

    return state
}, {
    currentControl: '',
    movieData: null,
    seriesData: null,
    searchInputValue: '',
    searchList: [],
    selectidMovie: null,
    selectidCategory: 0,
    selectidCategoryId: 0,
})

export default store