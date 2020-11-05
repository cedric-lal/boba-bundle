import { combineReducers } from "redux";
import packageStats from "./packageStats";
import search from "./search";

export default combineReducers({
  search,
  packageStats
});
