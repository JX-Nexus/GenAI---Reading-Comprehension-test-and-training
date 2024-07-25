import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'

import { authLayout } from './components'

import HomePage from './pages/HomePage.jsx'
import SignUp from './pages/SignUp.jsx'
import LoginPage from './pages/LoginPage.jsx'

import BookType from './pages/BookType.jsx'
import MainPage from './pages/Mainpage.jsx'

import Novel from './pages/Novel.jsx'
import MangaGenres from './pages/Manga.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element:(
        <authLayout>
          <HomePage />
        </authLayout>
        ),
    },
      {
        path: "/rec",
        element: (
          <authLayout>
            <BookType />
          </authLayout>
          ),
    },
        {
            path: "/register",
            element: <SignUp />,
        },
        {
          path: "/login",
          element: <LoginPage />,
      },{
        path: "manga/genres",
        element: (
          <authLayout>
            <MangaGenres />
          </authLayout>
          ),
    },
    {
      path: "novel/genres",
      element: (
        <authLayout>
          <Novel />
        </authLayout>
        ),
  },{
    path: "/passage",
    element: (
      <authLayout>
        <MainPage />
      </authLayout>
      ),
},
     ]}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
