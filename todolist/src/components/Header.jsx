export default function Header(){
  return (
    <div>
      <h3 class= 'my-3'>오늘은 🐱‍💻</h3>
      <h1 class= 'text-sky-500 font-bold'>{new Date().toDateString()}</h1>
    </div>
  )
}