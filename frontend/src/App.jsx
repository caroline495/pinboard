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
    // errorElement: <PageMissing />,
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
  //  {
  //     path: "*", 
  //     element: <PageMissing />
  //   }
]);

function App() {
  
  return <RouterProvider router={router} />

}

export default App
