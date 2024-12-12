export default function TodoItem({id, isDone, content, date, onUpdate, onDelete}){
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () =>{
    onDelete(id);
  }
  return (
    <div class='flex items-center gap-5 pb-7 border-b-2 border-slate-200'>
      <input onChange = {onChangeCheckbox} readOnly checked={isDone} class ='w-5' type="checkbox" />
      <div class ='flex-1'>{content}</div>
      <div class ='text-sm text-slate-300'>{new Date(date).toLocaleDateString()}</div>
      <button class='cursor-pointer text-sm rounded-md bg-slate-300 p-1' onClick={onClickDeleteButton}>삭제</button>
    </div>
  )
}