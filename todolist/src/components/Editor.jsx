import { useState,useRef } from "react"

export default function Editor({onCreate}){
  const [content,setContent] = useState("")
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeydown = (e) =>{
    if(e.keyCode === 13){
      onSubmit();
    }
  };

  const onSubmit = () =>{
    if(content === ''){
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };
  return (
    <div className='flex gap-3'>
      <input className='flex-1 border-solid border-2 border-slate-300 rounded-md p-3' ref ={contentRef} onKeyDown={onKeydown} value={content} onChange={onChangeContent} type="text" placeholder="새로운 Todo..." />
      <button className='cursor-pointer w-[80px] bg-sky-300 text-white rounded-md' onClick={onSubmit}>추가</button>
    </div>
  )
}