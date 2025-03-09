import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/Lists";
import {
  useState,
  useCallback,
  createContext,
  useMemo,
  useEffect,
} from "react";
// import mockData from "./mock/MockData";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// function reducer(state, action) {
//   switch (action.type) {
//     case "CREATE":
//       return [action.data, ...state];
//     case "UPDATE":
//       return state.map((item) =>
//         item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
//       );
//     case "DELETE":
//       return state.filter((item) => item.id !== action.targetId);
//     default:
//       return state;
//   }
// }

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "check-list"));
      dispatch(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    }
    fetchData();
  }, []);

  const onCreate = useCallback(async (content) => {
    try {
      const docRef = await addDoc(collection(db, "check-list"), {
        isDone: false,
        content: content,
        date: new Date().toISOString(),
      });

      dispatch((prevTodos) => [
        ...prevTodos,
        {
          id: docRef.id,
          isDone: false,
          content: content,
          date: new Date().toISOString(),
        },
      ]);

      console.log("새로운 할 일 추가됨: ", docRef.id);
    } catch (error) {
      console.error("할 일 추가 중 오류 발생:", error);
    }
  }, []);

  const onUpdate = useCallback(
    (targetId) => {
      async function updateTodo() {
        try {
          const todoRef = doc(db, "check-list", targetId);
          const updatedTodos = todos.map((todo) =>
            todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
          );

          const updatedTodo = updatedTodos.find((todo) => todo.id === targetId);
          await updateDoc(todoRef, { isDone: updatedTodo.isDone });

          dispatch(updatedTodos);
          console.log("업데이트된 할 일: ", targetId);
        } catch (error) {
          console.error("할 일 업데이트 중 오류 발생:", error);
        }
      }

      updateTodo();
    },
    [todos]
  );

  const onDelete = useCallback((targetId) => {
    async function deleteTodo() {
      try {
        await deleteDoc(doc(db, "check-list", targetId));

        dispatch((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== targetId)
        );
        console.log("삭제된 할 일: ", targetId);
      } catch (error) {
        console.error("할 일 삭제 중 오류 발생:", error);
      }
    }

    deleteTodo();
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, [onCreate, onUpdate, onDelete]);

  return (
    <div className="w-[500px] m-auto flex flex-col gap-5">
      <Header />
      <TodoStateContext value={todos}>
        <TodoDispatchContext value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext>
      </TodoStateContext>
    </div>
  );
}

export default App;
