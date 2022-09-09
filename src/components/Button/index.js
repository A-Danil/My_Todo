import { useDispatch } from 'react-redux';

import { removeTodo } from '../../redux/actions';

import './Button.scss';

function Button({text}) {
  const dispatch = useDispatch();
  return (
    <button className='remove-btn' onClick={()=>dispatch(removeTodo())}>
      <span>{text}</span>
      <div className='liquid'></div>
    </button>
  )
}

export default Button;