import { FC } from 'react';

export type Todo = {
  id: number;
  title: string;
  detail: string;
  isCompleted: boolean;
};
export type Props = {
  todo: Todo;
  handleCompleted: (id: Todo['id']) => void;
  handleClickEditButton: (todo: Todo) => void;
  handleClickDeleteButton: (id: Todo['id']) => void;
};

const TodoItem: FC<Props> = ({
  todo,
  handleCompleted,
  handleClickEditButton,
  handleClickDeleteButton,
}) => {
  return (
    <li className={`item${todo.isCompleted ? ' completed' : ''}`}>
      <div className='col'>
        <h2>title: {todo.title}</h2>
        <p>detail: {todo.detail}</p>
      </div>
      <div className='col'>
        <input
          type='button'
          value='編集'
          onClick={() => handleClickEditButton(todo)}
        />
        <input
          type='button'
          value='削除'
          onClick={() => handleClickDeleteButton(todo.id)}
        />
        <input
          type='checkbox'
          checked={todo.isCompleted}
          onChange={() => handleCompleted(todo.id)}
        />
      </div>
    </li>
  );
};

export default TodoItem;
