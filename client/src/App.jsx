import Todo from "./Todo";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const url = "http://localhost:3001/todos";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() === "") {
      toast.error("Please enter text .", {
        position: "top-center",
      });
      return;
    }

    const url = "http://localhost:3001/todos/create";
    axios
      .post(url, {
        text: todoText,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setTodoText("");
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setTodos(response.data);
      console.log(todos);
    });
  }, [todos]);

  if (!todos) return null;

  return (
    <div>
      <ToastContainer />
      <section className=" my-10 border-y-2 md:border-2 border-blue-400 bg-blue-100 p-4 md:p-10 flex flex-col justify-start gap-6 items-center mx-0  md:mx-10 rounded-md h-[70vh] overflow-y-auto ">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            text={todo.text}
            complete={todo.complete}
            id={todo._id}
          />
        ))}
      </section>
      <section className=" border-y-[1px] md:border-[1px] border-green-700 bg-green-100 p-2 md:p-10 flex gap-7 rounded-md h-[15vh] my-10 mx-0 md:mx-10">
        <form
          onSubmit={handleSubmit}
          action=""
          className=" w-[100%] justify-between items-center flex px-5 "
        >
          <input
            placeholder="Enter your todo here"
            type="text"
            className=" border-green-500 border-[1px] px-4 py-3 rounded-md w-4/6 md:w-5/6"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button
            type="submit"
            className=" bg-green-500 text-white py-4 text-sm md:text-base px-4 md:px-6 rounded-md "
          >
            Create Todo
          </button>
        </form>
      </section>
    </div>
  );
};

export default App;
