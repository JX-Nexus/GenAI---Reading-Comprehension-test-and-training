import { useState,useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from './server/auth.js'

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        
        } else {
          dispatch(logout());
        }
  
        

        
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    initializeApp();
  }, [dispatch]);
  

  return (
    <>
    <div className='min-h-screen flex flex-wrap content-between bg-white'>
      <div className='w-full block'>
       
        <main>
          <div>            
          </div>
          <Outlet />
        </main>
       
      </div>
    </div>

    </>
  )
}

export default App
