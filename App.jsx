import React, { useState } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const App = () => {
  // State for the input value of the new Todo
  const [todo, setTodo] = useState("");
  // State for keeping track of all Todos
  const [todos, setTodos] = useState([]);
  // State for storing the id of the Todo being edited
  const [editId, setEditId] = useState(0);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // If editId is set, update the corresponding Todo
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    // If todo is not empty, add a new Todo to the list
    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  // Function to handle Todo deletion
  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  // Function to handle Todo editing
  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List</h1>
        
        {/* TodoForm component for adding/editing Todos */}
        <TodoForm
          handleSubmit={handleSubmit}
          todo={todo}
          editId={editId}
          setTodo={setTodo}
        />

        {/* TodoList component for displaying the list of Todos */}
        <TodoList
          todos={todos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
