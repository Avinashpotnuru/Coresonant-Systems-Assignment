//import styles
import "./App.css";

//react imports
import { useEffect, useMemo, useState } from "react";

// import third party packages
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

import {
  AiTwotoneDelete,
  AiOutlineEdit,
  AiFillCheckCircle,
} from "react-icons/ai";

import { BsCircle } from "react-icons/bs";

function App() {
  const [title, setTitle] = useState("");

  const userId = 1;

  const [id, setId] = useState(null);

  const [status, setStatus] = useState(false);

  const [todoList, setTodoList] = useState([]);

  const [toggle, setToggle] = useState(true);

  const [error, setError] = useState("");

  const [filterToggle, setFilterToggle] = useState("all");

  const baseUrl = "https://jsonplaceholder.typicode.com/users/1/todos";

  //get all todos

  const getTodos = async () => {
    const todoRes = await axios.get(`${baseUrl}`);

    if (todoRes.status) {
      setTodoList(todoRes.data.slice(0, 10));
    }
  };

  //add todo

  const addTodo = () => {
    setTodoList([
      ...todoList,
      { userId, id: todoList.length + 1, title, completed: status },
    ]);
    setTitle("");
  };

  //get edit todo item

  const editTodo = (id) => {
    setId(id);
    setToggle(false);
    const editItem = todoList.find((item) => item.id === id);
    setTitle(editItem?.title);
    setStatus(editItem?.completed);
    // console.log(title);
  };

  //update todo
  const updateTask = () => {
    let updateTaskList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, title };
      }
      return item;
    });
    setTodoList(updateTaskList);
    setToggle(true);
    setTitle("");
  };

  //change status of todo

  const handleStatusChange = (id) => {
    let completeTask = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodoList(completeTask);
  };

  //delete todo

  const deleteContact = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  // logic for filter complete  todos

  const completeTaskTodos = todoList.filter((item) => item.completed === true);

  //event handlers for inputs
  function eventHandler(e) {
    setTitle(e.target.value);
  }

  //form handlers
  const submitHandler = (e) => {
    e.preventDefault();

    if (title.length > 2) {
      addTodo();
      setError("");
    } else {
      setError("Name must be at least 2 characters long.");
    }
  };

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    if (title.length > 2) {
      updateTask();
      setError("");
    } else {
      setError("Name must be at least 2 characters long.");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <h1>todos list</h1>
      <div className="form shadow-lg p-5">
        {toggle ? (
          <Form onSubmit={submitHandler} autoComplete="true">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>TODO</Form.Label>
              <Form.Control
                onChange={eventHandler}
                name="title"
                value={title}
                type="text"
                placeholder="Enter your todo"
              />
            </Form.Group>
            {error && <p className="text-danger fw-bold">{error}</p>}

            <Button variant="primary" type="submit">
              Add todo
            </Button>
          </Form>
        ) : (
          <Form onSubmit={updateSubmitHandler} autoComplete="true">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={eventHandler}
                name="title"
                value={title}
                type="text"
                placeholder="Enter your name"
              />
            </Form.Group>
            {error && <p className="text-danger fw-bold">{error}</p>}

            <Button type="submit" variant="primary">
              Update todo
            </Button>
          </Form>
        )}
      </div>
      <div className="tabs_container">
        <button
          className={filterToggle === "all" ? "button_active" : ""}
          onClick={() => {
            setFilterToggle("all");
          }}
        >
          All Tasks
        </button>
        <button
          className={filterToggle === "completed" ? "button_active" : ""}
          onClick={() => {
            setFilterToggle("completed");
          }}
        >
          completed
        </button>
      </div>
      {filterToggle === "all" && (
        <div className="todos_container">
          {todoList.length <= 0 ? (
            <h3 className="text-danger mb-5">no todos</h3>
          ) : (
            <>
              {todoList.map((val, idx) => (
                <div key={idx} className="todo_item">
                  <div
                    className="status"
                    onClick={() => {
                      handleStatusChange(val?.id);
                    }}
                  >
                    {!val?.completed ? (
                      <BsCircle className="icon" />
                    ) : (
                      <AiFillCheckCircle
                        className="icon"
                        style={{ color: "green" }}
                      />
                    )}
                  </div>
                  <h4
                    style={{
                      textDecoration: val?.completed ? "line-through" : "",
                      color: val?.done ? "red" : "",
                    }}
                  >
                    {val?.title}
                  </h4>
                  <div className="edit">
                    <AiOutlineEdit
                      onClick={() => editTodo(val?.id)}
                      className="ml-4 mx-3 icon"
                    />
                    <AiTwotoneDelete
                      className="icon delete"
                      onClick={() => deleteContact(val?.id)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      {filterToggle === "completed" && (
        <div className="todos_container">
          {completeTaskTodos.length <= 0 ? (
            <h3 className="text-danger mb-5">no todos</h3>
          ) : (
            <>
              {completeTaskTodos.map((val, idx) => (
                <div key={idx} className="todo_item">
                  <div
                    className="status"
                    onClick={() => {
                      handleStatusChange(val?.id);
                    }}
                  >
                    {!val?.completed ? (
                      <BsCircle className="icon" />
                    ) : (
                      <AiFillCheckCircle
                        className="icon"
                        style={{ color: "green" }}
                      />
                    )}
                  </div>
                  <h4
                    style={{
                      textDecoration: val?.completed ? "line-through" : "",
                      color: val?.done ? "red" : "",
                    }}
                  >
                    {val?.title}
                  </h4>
                  <div className="edit">
                    <AiOutlineEdit
                      onClick={() => editTodo(val?.id)}
                      className="ml-4 mx-3 icon"
                    />
                    <AiTwotoneDelete
                      className="icon delete"
                      onClick={() => deleteContact(val?.id)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
