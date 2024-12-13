import { useReducer } from "react"

function reducer(state, action){
  if(action.type === 'INCREASE'){
    return state + action.data;
  }
}


export default function Exam(){
  const [state, dispatch] = useReducer(reducer, 0);
  const onClickPlus = () =>{
    dispatch({
      type : "INCREASE",
      data : 1
    })
  }

  return (
    <div>
      <h1>{state}</h1>
      <button onClick = {onClickPlus}>+</button>
    </div>
  )
}