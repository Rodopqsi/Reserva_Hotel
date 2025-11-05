import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Rooms from './pages/Rooms'
import Reservations from './pages/Reservations'

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container-box">
        <Routes>
          <Route path="/" element={<Navigate to="/rooms" replace />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </div>
    </div>
  )
}
