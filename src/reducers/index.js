import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import bookmarksListReducer from "./bookmarks_list_reducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    auth: authReducer,
    bookmarks: bookmarksListReducer,
    form: formReducer
});