import { RocketOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Empty } from 'antd';
import { format } from 'date-fns';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderBy } from 'lodash';

import { addTodo } from '../../redux/actions';
import { Item, Button } from '../index';

import './Todo.scss';
import classNames from 'classnames';

function Todo() {
  const [inputText, setInputText] = useState('');
  const [time, setTime] = useState('');

  const list = useSelector((state)=> state.todoReducers.list);
  const dispatch = useDispatch();

  function dispatchAddTodo(){
    setTime(format(new Date(),'H:mm'));
    dispatch(addTodo(inputText, time));
    setInputText('');
  }
 
  return (
    <div className="todo">
      <div className='todo__content'>
        <h1 className="todo__header">Add you list here <RocketOutlined /></h1>

        <Input
          className='todo__input'
          onChange={(e)=>{setInputText(e.target.value); setTime(format(new Date(),'H:mm'))}}
          onKeyDown={(e)=>{if(e.key === "Enter" && inputText){dispatchAddTodo()}}}
          size="large"
          value={inputText}
          placeholder="✍️ Add items..."
          suffix={ <PlusOutlined onClick={()=> {inputText && dispatchAddTodo()}} />}
        />

        <div className={classNames('todo__items', {
          'todo__items--scroll' : list.length > 4 || list.some(el=> el.data.length > 150)
        })}>
          { list.length > 0 ?
            orderBy(list, ["time"], ["desc"]).map((item) => (
              <Item key={item.id} {...item}/>
            )) :
            <Empty description="Add any item" />
          }
        </div>

        { list.length > 0 ?
          <div className='todo__btn'>
            <Button text='Remove all' />
          </div> :
          null
        }
      </div>
    </div>
  )
}

export default Todo;