import { DELETE_TODO } from '../types';

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

export default deleteTodo;