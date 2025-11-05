import { useEffect, useState } from 'react'
import { api } from '../api'

const empty = { room: '', customer_name: '', customer_email: '', check_in: '', check_out: '', status: 'pending', notes: '' }

export default function Reservations() {
  const [rooms, setRooms] = useState([])
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)

  const load = async () => {
    const [r1, r2] = await Promise.all([
      api.get('/rooms/'),
      api.get('/reservations/')
    ])
    setRooms(r1.data)
    setItems(r2.data)
  }
  useEffect(() => { load() }, [])

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await api.put(`/reservations/${editingId}/`, form)
    } else {
      await api.post('/reservations/', form)
    }
    setForm(empty); setEditingId(null); await load()
  }

  const edit = (it) => {
    setEditingId(it.id)
    setForm({
      room: it.room,
      customer_name: it.customer_name,
      customer_email: it.customer_email,
      check_in: it.check_in,
      check_out: it.check_out,
      status: it.status,
      notes: it.notes || ''
    })
  }

  const del = async (id) => {
    if (!confirm('Eliminar reserva?')) return
    await api.delete(`/reservations/${id}/`)
    await load()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Reservas</h1>

      <div className="card">
  <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Habitación</label>
            <select className="input" name="room" value={form.room} onChange={onChange} required>
              <option value="">Seleccione…</option>
              {rooms.map(r => <option key={r.id} value={r.id}>Hab. {r.number} ({r.room_type})</option>)}
            </select>
          </div>
          <div>
            <label className="label">Cliente</label>
            <input className="input" name="customer_name" value={form.customer_name} onChange={onChange} required />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" name="customer_email" value={form.customer_email} onChange={onChange} required />
          </div>
          <div>
            <label className="label">Check-in</label>
            <input type="date" className="input" name="check_in" value={form.check_in} onChange={onChange} required />
          </div>
          <div>
            <label className="label">Check-out</label>
            <input type="date" className="input" name="check_out" value={form.check_out} onChange={onChange} required />
          </div>
          <div>
            <label className="label">Estado</label>
            <select className="input" name="status" value={form.status} onChange={onChange}>
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="label">Notas</label>
            <textarea className="input" name="notes" value={form.notes} onChange={onChange} rows="3" />
          </div>
          <div className="flex items-end">
            <button className="btn">{editingId ? 'Actualizar' : 'Crear'}</button>
            {editingId && (
              <button type="button" className="btn btn-secondary ml-2" onClick={() => { setForm(empty); setEditingId(null) }}>Cancelar</button>
            )}
          </div>
          {/* Preview removido en la versión revertida */}
        </form>
      </div>

      {/* Sección de estado de habitaciones removida en la versión revertida */}

      <div className="grid md:grid-cols-2 gap-4">
        {items.map(it => (
          <div key={it.id} className="card">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{it.customer_name}</h3>
                <p className="text-sm text-gray-600">{it.customer_email}</p>
              </div>
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm">{it.status}</span>
            </div>
            <p className="text-sm mt-1">Hab. {it.room_detail?.number} — {it.room_detail?.room_type}</p>
            <p className="text-sm">{it.check_in} → {it.check_out}</p>
            {it.notes && <p className="text-sm mt-1">Notas: {it.notes}</p>}
            <div className="mt-3 flex gap-2">
              <button className="btn" onClick={() => edit(it)}>Editar</button>
              <button className="btn btn-secondary" onClick={() => del(it.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
