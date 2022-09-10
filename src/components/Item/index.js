import { DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { deleteTodo, checkTodo } from '../../redux/actions';

import './Item.scss';

function Item({data, id, time, completed}) {
  const dispatch = useDispatch();
  const [isDelete, setDelete] = useState(false);

  const itemVariant = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    },
  };

  return (
    <AnimatePresence>
      {!isDelete &&
        <motion.div 
          variants={itemVariant} 
          initial={{opacity: 0}} 
          animate={{opacity: 1}} 
          exit={{opacity: 0}} 
          className={classNames('item', {
            'item--done' : completed,
            'item--big' : data.length > 150
          })}
        >

          <h3 className={classNames('', {'done' : completed})}>{data}</h3>
          <motion.span whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <DeleteOutlined className='item__del' onClick={()=> {
              setDelete(!isDelete);
              setTimeout(()=>{
                dispatch(deleteTodo(id))
              }, 500)
              }}/>
          </motion.span>
          <label>
            <input type="checkbox" checked={completed} onChange={()=> dispatch(checkTodo(id))}/>
            <span className='checkbox'></span>
          </label>
          <span className='item__time'>{time}</span>

      </motion.div>}
    </AnimatePresence>
  )
}

export default Item;