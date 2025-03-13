import { memo, useContext } from "react";
import { TodoDispatchContext } from "../App";

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };
  return (
    <div className="flex items-center gap-5 pb-7 border-b-2 border-slate-200">
      <input
        onChange={onChangeCheckbox}
        readOnly
        checked={isDone}
        className="w-5"
        type="checkbox"
      />
      <div className="flex-1">{content}</div>
      <div className="text-sm text-slate-300">{date}</div>
      <button className="btn-del" onClick={onClickDeleteButton}>
        삭제
      </button>
    </div>
  );
};
export default memo(TodoItem);
