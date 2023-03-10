import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Index from './Index'
import ErrorPage from './routes/ErrorPage'
import Home from './routes/Home'
import StudentInfo from './routes/StudentInfo'
import TeacherInfo from './routes/TeacherInfo'
import Registry from './routes/Registry'

import NewStudent from './routes/NewStudent'
import NewTeacher from './routes/NewTeacher'
import NewClass from './routes/NewClass'
import ClassInfo from './routes/ClassInfo'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/alunos/:id",
        element: <StudentInfo />
      },
      {
        path: "professores/:id",
        element: <TeacherInfo />
      },
      {
        path: "turmas/:id",
        element: <ClassInfo />
      },
      {
        path: "cadastro",
        element: <Registry />
      },
      {
        path: "new/aluno",
        element: <NewStudent />
      },
      {
        path: "new/professor",
        element: <NewTeacher />
      },
      {
        path: "new/turma",
        element: <NewClass />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
)
