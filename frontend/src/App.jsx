import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import PinForm from './components/PinForm'
import { Outlet, RouterProvider, createBrowserRouter, useRouteError, isRouteErrorResponse } from 'react-router-dom'
import UserProfile from './components/UserProfile'
import BoardIndex from './components/BoardIndex'
import PinIndex from './components/PinIndex'
import PinPage from './components/PinPage'
import BoardPage from './components/BoardPage'

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />    
    </>

  )
}

function PageMissing() {
  const error = useRouteError();
  // if (isRouteErrorResponse(error)) 
  //   console.log(`${error.status} ${error.statusText} ${error.data}`);
  return <h2>Page Not Found</h2>;
}

const router = createBrowserRouter([
  {
   path: '/',
   element: 
    <>
      <NavBar />
      <Outlet />
    </>,
    errorElement: <PageMissing />,
   children: [
    {
      index: true,
      element:
      <PinIndex />
    },
    {
      path: 'pin-creation-tool',
      element: <PinForm />
    },
    {
      path: ':username/',
      element: 
      <>
        <UserProfile />
        <Outlet />
      </>,
      errorElement: <PageMissing />,
      children: [
        {
          index: true,
          element:
          <BoardIndex />
        },
        {
          path: '_saved/',
          element:
          <>
            <BoardIndex />
          </>
        },
        {
          path: '_created/',
          element:
          <>
            <PinIndex />
          </>
        },
        {
          path: "*", 
          element: <PageMissing />
        }
      ]
    },
    {
      path: 'pin/:pinId/',
      element: <PinPage />,
      errorElement: <PageMissing />
    },
    {
      path: 'board/:boardId',
      element: <BoardPage />,
      errorElement: <PageMissing />
    }
   ]  
  },
   {
      path: "*", 
      element: <PageMissing />
    }
]);

function App() {
  
  return <RouterProvider router={router} />

}

export default App

// const [count, setCount] = useState(0)
{/* <div>
<a href="https://vitejs.dev" target="_blank">
  <img src={viteLogo} className="logo" alt="Vite logo" />
</a>
<a href="https://react.dev" target="_blank">
  <img src={reactLogo} className="logo react" alt="React logo" />
</a>
</div>
<h1>Vite + React</h1>
<div className="card">
<button onClick={() => setCount((count) => count + 1)}>
  count is {count}
</button>
<p>
  Edit <code>src/App.jsx</code> and save to test HMR
</p>
</div>
<p className="read-the-docs">
Click on the Vite and React logos to learn more
</p> */}

