import {memo} from 'react'

const Header = () => {
  return (
    <div>
      <h3 className= 'my-3'>오늘은 🐱‍💻</h3>
      <h1 className= 'text-sky-500 font-bold'>{new Date().toDateString()}</h1>
    </div>
  )
}
const memoizedHeader = memo(Header)
export default  memoizedHeader()