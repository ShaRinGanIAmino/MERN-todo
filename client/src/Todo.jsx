import { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const Todo = ({ text, complete, id }) => {
  console.log("Deleting todo with id:", id);

  const handleUpdate = (todoId) => {
    axios
      .put(`http://localhost:3001/todos/update/${todoId}`)
      .then((response) => {
        console.log(response.data);

        // Update your component's state or perform any necessary actions
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        // Handle errors or show error messages to the user
      });
  };

  const handleDelete = (todoId) => {
    // Make a DELETE request to the API endpoint for deleting a specific todo
    axios
      .delete(`http://localhost:3001/todos/delete/${todoId}`)
      .then((response) => {
        console.log(response.data);

        // Update your component's state or perform any necessary actions
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        // Handle errors or show error messages to the user
      });
  };

  return (
    <div
      className={`border-[1px] bg-white ${
        complete ? "border-green-500" : "border-red-500"
      } flex gap-2 py-4 px-10 justify-between items-center rounded-md w-full`}
    >
      <p className=" normal-case text-neutral-700">{text}</p>
      <div className=" flex justify-center items-center gap-4 ">
        <button
          onClick={() => handleUpdate(id)}
          className={`border-[1px] p-2 rounded-sm ${
            complete ? "text-green-500" : "text-red-500"
          } ${complete ? "border-green-500" : "border-red-500"} `}
        >
          {complete ? <AiOutlineCheck /> : <AiOutlineClose />}
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="border-[1px] p-2 rounded-sm text-red-500 border-red-500"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Todo;
