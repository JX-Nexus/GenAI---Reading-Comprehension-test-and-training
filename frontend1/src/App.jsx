import { useState } from 'react'
import {Header} from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-black'>
      ABC efgh
    </div>
  ) 
}

export default App
