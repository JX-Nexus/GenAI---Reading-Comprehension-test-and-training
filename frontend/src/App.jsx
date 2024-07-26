import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from './server/auth.js'

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userData = await authService.getCurrentUser();
        console.log(userData)
        if (userData) {
          dispatch(login({ userData }));
        
        } else {
          dispatch(logout());
        }
  
        

        
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };
  
    initializeApp();
  }, [dispatch]);
  

  return (
    <>
    <div className='min-h-screen flex flex-wrap content-between bg-green-200'>
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
