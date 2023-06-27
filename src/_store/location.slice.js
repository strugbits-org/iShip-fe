import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { authActions } from '_store';
import { fetchWrapper } from '_helpers';

// create slice

const name = 'location';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const locationActions = { ...slice.actions, ...extraActions };
export const locationReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        list: null,
        item: null
    }
}

function createExtraActions() {
    // const baseUrl = `${process.env.FRONTEND_URL_PORT}/users`;
    // const baseUrl = `${process.env.BACKEND_URL}`;

    return {
        addLocation: addLocation(),
        getAll: getAll(),
        update: update(),
    };


    function addLocation() {
        return createAsyncThunk(
            `${name}/addLocation`,
            async (data) => await fetchWrapper.post(`https://iship.herokuapp.com/location/add-location`, data)
        );
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(`https://iship.herokuapp.com/location/get-location`)
            );
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async function ({ id, obj }) {
                await fetchWrapper.patch(`https://iship.herokuapp.com/location/update-location?id=${id}`, obj);
            }
        );
    }

  
}

function createExtraReducers() {
    return (builder) => {
        getAll();

        function getAll() {
            var { pending, fulfilled, rejected } = extraActions.getAll;
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.list = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error };
                });
        }

    }
}
