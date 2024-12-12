import TodoItem from './TodoItem'
import { useState } from 'react';

export default function List({todos, onUpdate, onDelete}){
  const [search,setSearch] = useState("");

  const onChangeSearch = (e) =>{
    setSearch(e.target.value);
  };

  const getFilteredData = () =>{
    if(search === ""){
      return todos;
    }
    return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
  }

  const filteredTodos = getFilteredData();

  return (
    <div class='flex flex-col gap-5'>
      <h3>Todo List ✔</h3>
      <input value={search} onChange={onChangeSearch} class='w-full border-b-2 border-slate-300 py-3.5 outline-none focus:border-sky-300 ' type="text" placeholder="검색어를 입력하세요" />
      <div class='flex flex-col gap-5'>
        {filteredTodos.map((todo)=>{
          return <TodoItem key ={todo.id} {...todo} onUpdate = {onUpdate} onDelete ={onDelete}/>;
        })}
      </div>
    </div>
  )
}