import { CHECK_ON_TODO } from '../types';

const checkTodo = (id) => {
  return {
    type: CHECK_ON_TODO,
    id
  }
}

export default checkTodo;