import { createSlice } from '@reduxjs/toolkit';

// create slice

const name = 'mobile';
const initialState = createInitialState();
const reducers = createReducers();
const slice = createSlice({ name, initialState, reducers });

// exports

export const mobileActions = { ...slice.actions };
export const mobileReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        value: null
    }
}

function createReducers() {
    return {
        showMobile,
        hideMobile,
        activeSidebar,
        closeSideBar
    };

    // payload can be a string message ('mobile message') or 
    // an object ({ message: 'mobile message', showAfterRedirect: true })
    function showMobile(state, action) {
        state.value = {
            type: 'true',
            class: action.payload
        };
    }
    function hideMobile(state, action) {
        state.value = {
            type: 'true',
            class: action.payload
        };
    }
    function activeSidebar(state, action) {
        state.value = {
            type: 'true',
            class: action.payload
        };
    }
    function closeSideBar(state, action) {
        state.value = {
            type: 'true',
            class: action.payload
        };
    }
}