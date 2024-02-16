import "./App.css";
import Navbar from "./components/Navbar";
import { useState,useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){

    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
  }, [])
  

  const saveToLocalStorage = (params)=>{
    localStorage.setItem("todos" , JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
  };

  const handleEdit = (e , id) => {
    let t = todos.filter(item=>item.id === id)
    setTodo(t[0].todo)

    //deletet after getting it in input
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const toggleFinished = (e)=>{  
    setShowFinished(!showFinished)


  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-xl">iTask - Manage Your Todos At One Place</h1>
        <div className="addTodo my-5 flex flex-col gap-2">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-full px-5 py-1"
          />
          <button
          disabled={todo.length < 3}
            onClick={handleAdd}
            className="bg-violet-800 disabled:bg-violet-300 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-full mt-3"
          >
            Add
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> show finished
        <h2 className="font-bold text-lg">Your Todo</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos To Display</div>}

          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className={"todo flex md:w-3/4 justify-between my-3"}
              >
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    name={item.id}
                    onChange={handCheckbox}
                    value={item.isCompleted}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e)=>{handleEdit(e , item.id)}}
                    className="bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                   <MdDeleteForever />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
