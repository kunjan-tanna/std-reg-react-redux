import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Slices
import usersSlice from "./slices/users";

const rootPersistConfig = {
   key: "root",
   storage: storage,
   blacklist: ["common"],
};
const rootReducer = combineReducers({
   common: persistReducer(rootPersistConfig, usersSlice),
});
export { rootPersistConfig, rootReducer };
