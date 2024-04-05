import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import PinForm from './components/PinForm'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />    
    </>

  )
}

const router = createBrowserRouter([
  {
   path: '/',
   element: 
    <>
      <NavBar />
      <Outlet />
    </>,
   children: [
    {
      path: 'pin-creation-tool',
      element: <PinForm />
    }
   ] 
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

