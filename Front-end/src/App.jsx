import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './Pages/AuthenticationPage/Auth'
import Dashboard from './Pages/Dashboard/Dashboard'
import Event from './Pages/EventPage/Event'
import UserEvents from './Pages/EventPage/UserEvents'
function App() {

  return (
    <>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path='home' element={<Event />} />
          <Route path='events' element={<UserEvents />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
