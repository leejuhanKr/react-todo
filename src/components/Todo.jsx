import { useCallback, useEffect, useState } from "react";

const useDebounce = (func, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
      console.log("time reset");
    }
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};

const Todo = ({ content, onEdit, onClickDeleteBtn }) => {
  const [text, setText] = useState(content);
  const [isEdit, setIsEdit] = useState(onEdit);
  const [isChecked, setIsChecked] = useState(false);

  const deleteTodo = useCallback(useDebounce(onClickDeleteBtn, 1000), []);
  const onBlur = () => {
    if (!text) onClickDeleteBtn()
    setIsEdit(false)
  }


  return (
    <li>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setIsChecked((prev) => !prev);
          deleteTodo(isChecked);
        }}
      />
      {isEdit ? (
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            autoFocus={true}
            onBlur={onBlur}
          />
          <button>i</button>
        </>
      ) : (
        <>
          <span onClick={() => setIsEdit(true)}>{text}</span>
        </>
      )}
    </li>
  );
};

export default Todo;
