import { RocketOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Empty, Alert } from 'antd';
import { format } from 'date-fns';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderBy } from 'lodash';
import { motion } from "framer-motion";
import { AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import { addTodo } from '../../redux/actions';
import { Item, Button } from '../index';

import './Todo.scss';

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
  
  function handleChange(e){
    setInputText(e.target.value); 
    setTime(format(new Date(),'H:mm'));
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="todo">
      <motion.div className='todo__content'
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <h1 className="todo__header">Add you list here <RocketOutlined /></h1>

        <Input
          className={classNames('todo__input', {'todo__input--error' : inputText.length === 250})}
          maxLength="250"
          onChange={(e)=>{handleChange(e)}}
          onKeyDown={(e)=>{if(e.key === "Enter" && inputText){dispatchAddTodo()}}}
          size="large"
          value={inputText}
          placeholder="✍️ Add items..."
          suffix={
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <PlusOutlined onClick={()=> {inputText && dispatchAddTodo()}} />
            </motion.span>
          }
          prefix={inputText.length === 250 &&
            <AnimatePresence>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Alert
                  className='error'
                  message="250 symbols lymit"
                  type="warning"
                />
              </motion.span>
            </AnimatePresence>
            }
        />

        <div className={classNames('todo__items', {'todo__items--scroll' : list.length > 4 || list.some(el=> el.data.length > 150)})}>
          { list.length > 0 ?
            orderBy(list, ["id"], ["desc"]).map((item) => (
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
      </motion.div>
    </div>
  )
}

export default Todo;