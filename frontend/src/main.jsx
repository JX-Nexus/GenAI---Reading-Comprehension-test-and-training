import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'

import SignUp from './pages/SignUp.jsx'
import LoginPage from './pages/LoginPage.jsx'

import GenresPage from './pages/GenresPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <GenresPage />,
    },
        {
            path: "/register",
            element: <SignUp />,
        },
        {
          path: "/login",
          element: <LoginPage />,
      },
     ]}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
