import { store, authActions } from '_store';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    patch: request('PATCH'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url),
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        // console.log("requestOptions", requestOptions);
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url) {
    // console.log(url);
    // return auth header with jwt if user is logged in and request is to the api url
    const token = authToken();
    const isLoggedIn = !!token;
    // const isApiUrl = url.startsWith(process.env.FRONTEND_URL_PORT);
    const isApiUrl = url.startsWith('https://iship.herokuapp.com');
    if (isLoggedIn && isApiUrl) {
        // return { Authorization: `Bearer ${token}` };
        return { Authorization: `${token}` };
    } else {
        return {};
    }
}

function authToken() {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const token = auth?.token
    // console.log("here", token);
    // return store.getState().auth?.token;
    return token;
}

async function handleResponse(response) {
    // console.log("inside response");
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
        if ([401, 403].includes(response.status) && authToken()) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            const logout = () => store.dispatch(authActions.logout());
            logout();
        }

        // get error message from body or default to response status
        // console.log("response", data);
        const error = (data && data.errors[0].msg) || response.status;
        return Promise.reject(error);
    }
    // console.log("data", data);
    return data;
}