import './App.css';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/Lists';
import { useRef, useReducer, useCallback, createContext, useMemo } from 'react'
import mockData from './mock/MockData';

function reducer(state, action){
  switch(action.type){
    case "CREATE" : 
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item)=> item.id === action.targetId?{...item,isDone: !item.isDone}:item);
    case "DELETE":
      return state.filter((item)=> item.id !== action.targetId)
    default:
      return state;
  }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);
  const onCreate = useCallback((content) => {
    dispatch({
      type : 'CREATE',
      data : {
        id : idRef.current ++,
        isDone : false,
        content : content,
        date : new Date().getDate(),
      }
    })
  },[])

  const onUpdate = useCallback((targetId)=>{
    dispatch({
      type : "UPDATE",
      targetId : targetId
    })
  },[])

  const onDelete = useCallback((targetId) => {
    dispatch({
      type : "DELETE",
      targetId : targetId
    })
  },[])

  const memoizedDispatch = useMemo(()=>{
    return {onCreate, onUpdate, onDelete};
  },[])

  return (
    <div className = 'w-[500px] m-auto flex flex-col gap-5'>
      <Header/>
      <TodoStateContext value={todos}>
        <TodoDispatchContext value={memoizedDispatch}>
          <Editor/>
          <List/>
        </TodoDispatchContext>
      </TodoStateContext>
    </div>
  );
}

export default App;
