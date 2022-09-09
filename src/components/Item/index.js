import { DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { deleteTodo, checkTodo } from '../../redux/actions';

import './Item.scss';

function Item({data, id, time, completed}) {
  const dispatch = useDispatch();

  return (
    <div className={classNames('item', {
      'item--done' : completed,
      'item--big' : data.length > 150
      })}>
      <h3 className={classNames('', {'done' : completed})}>{data}</h3>
      <DeleteOutlined className='item__del' onClick={()=>dispatch(deleteTodo(id))}/>
      <label>
        <input type="checkbox" checked={completed} onChange={()=> dispatch(checkTodo(id))}/>
        <span className='checkbox'></span>
      </label>
      <span className='item__time'>{time}</span>
    </div>
  )
}

export default Item;