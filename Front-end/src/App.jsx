import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './Pages/AuthenticationPage/Auth'
import Dashboard from './Pages/Dashboard/Dashboard'
import Event from './Pages/EventPage/Event'
import Eventlist from './Pages/EventPage/Eventlist'
function App() {

  return (
    <>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path='home' element={<Event/>} />
        <Route to="events" element={<Eventlist/>} />

        </Route>
      </Routes>
    </>
  )
}

export default App
