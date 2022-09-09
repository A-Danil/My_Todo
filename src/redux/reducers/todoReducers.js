import { ADD_TODO, CHECK_ON_TODO, DELETE_TODO, REMOVE_TODO } from "../types";

const initialState = {
  list: []
};

const todoReducers = (state = initialState, action) =>{
  switch(action.type){
    
    case ADD_TODO:
      const { id, data, time } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id,
            data,
            time,
            completed: false
          }
        ]
      }

    case CHECK_ON_TODO:
      const checkedList = state.list.map(el=>{
        if(el.id !== action.id) return el

        return{
          ...el,
          completed: !el.completed
        }
      })
      return{
        ...state,
        list: checkedList
      }
    
    case DELETE_TODO:
      const newList = state.list.filter(el=> el.id !== action.id);
      return{
        ...state,
        list: newList
      }

    case REMOVE_TODO:
      return{
        ...state,
        list: []
      }

    default:
      return state
  }
}

export default todoReducers;