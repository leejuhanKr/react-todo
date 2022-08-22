import styled from "styled-components";
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
const TodoLi = styled.div`
  input[type="text"] {
    all: unset;
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + label {
    height: 20px;
    width: 20px;
    background-color: transparent;
    border: 2px solid #000;
    border-radius: 50%;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    transition: border-color ease 0.2s;
    cursor: pointer;
  }
  
  input[type="checkbox"] + label::before,
  input[type="checkbox"] + label::after {
    position: absolute;
    height: 0;
    width: 4px;
    background-color: #34b93d;
    box-sizing: border-box;
    display: inline-block;
    transform-origin: left top;
    border-radius: 5px;
    content: " ";
    transition: opacity ease 0.5;
  }
  input[type="checkbox"] + label::before,
  input[type="checkbox"] + label::after {
    background-color: #4285f4;
  }
  input[type="checkbox"] + label::before {
    top: 14.4px;
    left: 8.2px;
    box-shadow: 0 0 0 1px transparent;
    transform: rotate(-135deg);
  }
  input[type="checkbox"] + label::after {
    top: 7.4px;
    left: 1px;
    transform: rotate(-45deg);
  }
  input[type="checkbox"]:checked + label {
    border-color: #4285f4;
  }
  input[type="checkbox"]:checked + label::after {
    height: 10px;
    animation: bottomcheck 0.2s ease 0s forwards;
  }
  input[type="checkbox"]:checked + label::before {
    height: 24px;
    animation: topcheck 0.4s ease 0s forwards;
  }
  @keyframes bottomcheck {
    0% {
      height: 0;
    }
    100% {
      height: 10px;
    }
  }
  @keyframes topcheck {
    0% {
      height: 0;
    }
    50% {
      height: 0;
    }
    100% {
      height: 24px;
    }
  }
  `;
const Todo = ({ id, content, onEdit, onClickDeleteBtn }) => {
  const [text, setText] = useState(content);
  const [isEdit, setIsEdit] = useState(onEdit);
  const [isChecked, setIsChecked] = useState(false);

  const deleteTodo = useCallback(useDebounce(onClickDeleteBtn, 1000), []);
  const onBlur = () => {
    if (!text) onClickDeleteBtn();
    setIsEdit(false);
  };

  return (
    <TodoLi>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setIsChecked((prev) => !prev);
          deleteTodo(isChecked);
        }}
      />
      <label htmlFor={id} className="cb2"></label>
      {isEdit ? (
        <>
          <input
            className="edit-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            autoFocus={true}
            onBlur={onBlur}
          />
          <button>i</button>
        </>
      ) : (
        <span onClick={() => setIsEdit(true)}>{text}</span>
      )}

      <hr></hr>
    </TodoLi>
  );
};

export default Todo;
