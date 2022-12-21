import { ChangeEventHandler, FC, FormEventHandler } from 'react';

export type InputValues = {
  id: null | number;
  title: string;
  detail: string;
};
export type Props = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  inputValues: InputValues;
  handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const TodoForm: FC<Props> = ({
  handleSubmit,
  inputValues,
  handleInputChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        placeholder='タイトルを入力してね'
        value={inputValues.title}
        onChange={handleInputChange}
      />
      <textarea
        name='detail'
        placeholder='詳細を入力してね'
        value={inputValues.detail}
        onChange={handleInputChange}
      />
      <input type='submit' value={inputValues.id ? '更新' : '追加'} />
    </form>
  );
};

export default TodoForm;
