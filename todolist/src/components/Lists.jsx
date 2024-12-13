import TodoItem from './TodoItem'
import { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from '../App';

export default function Lists(){
  const todos = useContext(TodoStateContext)
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

  const {totalCount, doneCount, notDoneCount } = 
  useMemo(()=>{
    const totalCount = todos.length;
    const doneCount = todos.filter(
      (todo) => todo.isDone).length;
      const notDoneCount = totalCount - doneCount;
      return {
        totalCount,
        doneCount,
        notDoneCount
      }
  },[todos])
  // const {totalCount, doneCount, notDoneCount} = getAnalyzedDate()
  return (
    <div className='flex flex-col gap-5'>
      <h3>Todo List ✔</h3>
      <div>total : {totalCount} </div>
      <div>done : {doneCount} </div>
      <div>notDone : {notDoneCount} </div>
      <input value={search} onChange={onChangeSearch} className='w-full border-b-2 border-slate-300 py-3.5 outline-none focus:border-sky-300 ' type="text" placeholder="검색어를 입력하세요" />
      <div className='flex flex-col gap-5'>
        {filteredTodos.map((todo)=>{
          return <TodoItem key ={todo.id} {...todo}/>;
        })}
      </div>
    </div>
  )
}