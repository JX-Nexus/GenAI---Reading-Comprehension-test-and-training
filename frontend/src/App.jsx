import { useState } from 'react'
import {Header} from './components'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <div>            
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
  <>
  <p>Loading</p>
  </>
  )
}

export default App
