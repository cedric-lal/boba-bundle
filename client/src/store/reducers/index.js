import { combineReducers } from 'redux';
import packageStats from './package-stats/packageStats';
import search from './search/search';

export default combineReducers({
  search,
  packageStats,
});
