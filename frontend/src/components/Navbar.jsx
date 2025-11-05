import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkCls = ({ isActive }) =>
    `px-3 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100'}`

  return (
    <nav className="bg-white border-b mb-6">
      <div className="container-box flex items-center justify-between h-14">
        <Link to="/" className="font-semibold text-lg">Hotel</Link>
        <div className="space-x-2">
          <NavLink to="/rooms" className={linkCls}>Habitaciones</NavLink>
          <NavLink to="/reservations" className={linkCls}>Reservas</NavLink>
        </div>
      </div>
    </nav>
  )
}
