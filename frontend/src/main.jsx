import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'

import { AuthLayout } from './components'

import HomePage from './pages/HomePage.jsx'
import SignUp from './pages/SignUp.jsx'
import LoginPage from './pages/LoginPage.jsx'

import QuestionAnswerForm from './pages/QuestionAndAnswer.jsx'
import BookType from './pages/BookType.jsx'
import MainPage from './pages/Mainpage.jsx'
import Result from './pages/Results.jsx'
import Recommendation from './pages/Recommendation.jsx'

import Novel from './pages/Novel.jsx'
import MangaGenres from './pages/Manga.jsx'
import ReligiousScriptures from './pages/ReligiousScriptures.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element:(
        <AuthLayout>
          <HomePage />
        </AuthLayout>
        ),
    },
      {
        path: "/rec",
        element: (
          <AuthLayout>
            <BookType />
          </AuthLayout>
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
          <AuthLayout>
            <MangaGenres />
          </AuthLayout>
          ),
    },
    {
      path: "novel/genres",
      element: (
        <AuthLayout>
          <Novel />
        </AuthLayout>
        ),
  },{
    path: "religious-scriptures/types",
    element: (
      <AuthLayout>
        <ReligiousScriptures />
      </AuthLayout>
      ),
},{
    path: "/passage",
    element: (
      <AuthLayout>
        <MainPage />
      </AuthLayout>
      ),
      
},{
  path: "/passage/:id",
  element: (
    <AuthLayout>
      <QuestionAnswerForm />
    </AuthLayout>
    ),
},{
  path: "/passage/:id/result",
  element: (
    <AuthLayout>
      <Result />
    </AuthLayout>
    ),
},
{
  path: "/recommendation",
  element: (
    <AuthLayout>
      <Recommendation />
    </AuthLayout>
    ),
},
     ]}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
