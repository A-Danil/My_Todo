import { ADD_TODO } from "../types"

const addTodo = (data, time) => {
  return {
    type: ADD_TODO,
    payload: {
      id: new Date().getTime().toString(),
      data,
      time
    }
  }
}

export default addTodo;