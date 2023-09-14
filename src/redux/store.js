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

    if (action.type === 'CANGE_LIVETV_DATA') {
        return {
            ...state,
            liveTvData: action.payload.data
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

    if (action.type === 'CHANGE_SELECTID_CHANNEL') {
        return {
            ...state,
            selectidChannel: action.payload.channel
        }

    }

    if (action.type === 'CHANGE_SELECTID_LIVE_CATEGORY') {
        return {
            ...state,
            selectidLiveCategory: action.payload.liveCategory
        }

    }

    if (action.type === 'CHANGE_LIVETV_ALL_CHANNELS') {
        return {
            ...state,
            liveTvAllChannels: action.payload.channels
        }

    }

    if (action.type === 'CHANGE_INFO_STATE') {
        return {
            ...state,
            infoPageState: action.payload.infoPageState
        }

    }

    return state
}, {
    currentControl: 'menu-item',
    movieData: null,
    seriesData: null,
    liveTvData: null,
    searchInputValue: '',
    searchList: [],
    selectidMovie: null,
    selectidCategory: 0,
    selectidCategoryId: 0,
    selectidChannel: 0,
    selectidLiveCategory: null,
    liveTvAllChannels: null,
    infoPageState: false

})


export default store