import React, { useEffect, useState } from 'react';
import './style.css';

import DogImage from '../../components/DogImage';
import TodoForm from '../../components/TodoForm';
import TodoItem from '../../components/TodoItem';
import type { Todo, Props as TodoItemProps } from '../../components/TodoItem';
import type {
  InputValues,
  Props as TodoFormProps,
} from '../../components/TodoForm';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'お買い物',
      detail: '歯磨き粉',
      isCompleted: true,
    },
    {
      id: 2,
      title: '掃除',
      detail: 'リビング',
      isCompleted: false,
    },
  ]);
  const [inputValues, setInputValues] = useState<InputValues>({
    id: null,
    title: '',
    detail: '',
  });
  const [dogImageSrc, setDogImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();

      setDogImageSrc(data.message);
      setIsLoading(false);
    };
    request();
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValues.id) {
      const updateTodos = todos.map((todo) => {
        if (todo.id === inputValues.id) {
          todo.title = inputValues.title;
          todo.detail = inputValues.detail;
        }
        return todo;
      });
      setTodos(updateTodos);
      setInputValues({
        id: null,
        title: '',
        detail: '',
      });
      return;
    }
    const nextId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    setTodos([
      ...todos,
      {
        id: nextId,
        title: inputValues.title,
        detail: inputValues.detail,
        isCompleted: false,
      },
    ]);
    setInputValues({
      id: null,
      title: '',
      detail: '',
    });
  };

  const handleCompleted = (id: Todo['id']) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  const handleClickEditButton = (todo: Todo) => {
    setInputValues({
      id: todo.id,
      title: todo.title,
      detail: todo.detail,
    });
  };

  const handleClickDeleteButton = (id: Todo['id']) => {
    const updateTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(updateTodos);
  };

  const todoFormProps: TodoFormProps = {
    handleSubmit,
    inputValues,
    handleInputChange,
  };

  const todoItemProps: Omit<TodoItemProps, 'todo'> = {
    handleCompleted,
    handleClickEditButton,
    handleClickDeleteButton,
  };

  return (
    <div>
      <h1 className='title'>TODO LIST</h1>
      {isLoading ? <p>Loading...</p> : <DogImage dogImageSrc={dogImageSrc} />}
      <TodoForm {...todoFormProps} />
      <ul>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} {...{ ...todoItemProps, todo }} />;
        })}
      </ul>
    </div>
  );
};

export default App;
