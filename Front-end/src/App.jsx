import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './Pages/AuthenticationPage/Auth'
import Event from './Pages/EventPage/Event'
function App() {

  return (
    <>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/eventpage" element={<Event />} />
      </Routes>
    </>
  )
}

export default App
