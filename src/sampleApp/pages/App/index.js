import { useEffect, useReducer, useState } from 'react';
import './style.css';

import DogImage from '../../components/DogImage';
import TodoForm from '../../components/TodoForm';
import TodoItem from '../../components/TodoItem';

const App = () => {
  const [todos, setTodos] = useReducer(
    (state, action) => {
      const { type, payload } = action;

      switch (type) {
        case 'add': {
          return [
            ...state,
            {
              id: payload.id,
              title: payload.title,
              detail: payload.detail,
              isCompleted: false,
            },
          ];
        }
        case 'edit': {
          const newState = state.map((todo) => {
            if (todo.id === payload.id) {
              todo.title = payload.title;
              todo.detail = payload.detail;
            }
            return todo;
          });
          return newState;
        }
        case 'toggleCompleted': {
          const newState = state.map((todo) => {
            if (todo.id === payload.id) {
              todo.isCompleted = !todo.isCompleted;
            }
            return todo;
          });

          return newState;
        }
        case 'delete': {
          const newState = state.filter((todo) => {
            return todo.id !== payload.id;
          });

          return newState;
        }
        default: {
          return state;
        }
      }
    },
    [
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
    ]
  );
  const [inputValues, setInputValues] = useState({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.id) {
      setTodos({
        type: 'edit',
        payload: {
          id: inputValues.id,
          title: inputValues.title,
          detail: inputValues.detail,
        },
      });
    } else {
      const nextId = todos.length ? todos[todos.length - 1].id + 1 : 1;
      setTodos({
        type: 'add',
        payload: {
          id: nextId,
          title: inputValues.title,
          detail: inputValues.detail,
        },
      });
    }

    setInputValues({
      id: null,
      title: '',
      detail: '',
    });
  };

  const handleCompleted = (id) => {
    setTodos({
      type: 'toggleCompleted',
      payload: {
        id,
      },
    });
  };

  const handleClickEditButton = (todo) => {
    setInputValues({
      id: todo.id,
      title: todo.title,
      detail: todo.detail,
    });
  };

  const handleClickDeleteButton = (id) => {
    setTodos({ type: 'delete', payload: { id } });
  };

  return (
    <div>
      <h1 className='title'>TODO LIST</h1>
      {isLoading ? <p>Loading...</p> : <DogImage dogImageSrc={dogImageSrc} />}
      <TodoForm
        handleSubmit={handleSubmit}
        inputValues={inputValues}
        handleInputChange={handleInputChange}
      />
      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleCompleted={handleCompleted}
              handleClickEditButton={handleClickEditButton}
              handleClickDeleteButton={handleClickDeleteButton}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
