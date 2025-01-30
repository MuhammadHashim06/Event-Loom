import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './Pages/AuthenticationPage/Auth'
import Dashboard from './Pages/Dashboard/Dashboard'
import Event from './Pages/EventPage/Event'
function App() {

  return (
    <>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
        <Route index element={<Event/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
