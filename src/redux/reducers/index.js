import { combineReducers } from 'redux';

import todoReducers from './todoReducers';

const rootReduser = combineReducers({
  todoReducers
})

export default rootReduser;