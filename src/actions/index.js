import LocalApi from "./../apis/local";

export const setAuthToken = (token) => {
    sessionStorage.setItem("token", token);

    return {
        type: "AUTH_TOKEN",
        payload: token
    };
}

export const removeAuthToken = () => {
    sessionStorage.clear();

    return {
        type: "REMOVE_TOKEN",
        payload: null
    };
}

export const fetchBookmarks = () => {
    return async (dispatch, getState) => {
        let response = await LocalApi.get("/bookmarks");

        dispatch ({
            type: "BOOKMARKS_LIST",
            payload: response.data
        });
    }
}

export const createBookmark = ({ title, url }) => {
    return async (dispatch, getState) => {
        let response = await LocalApi.post("/bookmarks", {title, url});

        dispatch ({
            type: "BOOKMARKS_LIST",
            payload: response.data
        })
    }
}