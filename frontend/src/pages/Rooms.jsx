import { useEffect, useState } from 'react'
import { api, toFormData } from '../api'

const initial = { number: '', room_type: 'single', price: '', is_available: true, image: null }

export default function Rooms() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(initial)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  const load = async () => {
    const { data } = await api.get('/rooms/')
    setItems(data)
  }
  useEffect(() => { load() }, [])

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'file') setForm(prev => ({ ...prev, [name]: files[0] }))
    else if (type === 'checkbox') setForm(prev => ({ ...prev, [name]: checked }))
    else setForm(prev => ({ ...prev, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    setErr('')
    try {
      if (editingId) {
        const fd = toFormData(form)
        await api.put(`/rooms/${editingId}/`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        setMsg('Habitación actualizada correctamente')
      } else {
        const fd = toFormData(form)
        await api.post('/rooms/', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        setMsg('Habitación creada correctamente')
      }
      setForm(initial); setEditingId(null)
      await load()
    } catch (e) {
      console.error('Error creando/actualizando habitación', e)
      const data = e?.response?.data
      if (data) {
        // Mostrar el primer mensaje legible
        const firstKey = Object.keys(data)[0]
        setErr(`${firstKey}: ${Array.isArray(data[firstKey]) ? data[firstKey][0] : JSON.stringify(data[firstKey])}`)
      } else {
        setErr('Error de red o servidor. Revisa la consola del navegador.')
      }
    } finally { setLoading(false) }
  }

  const edit = (it) => {
    setEditingId(it.id)
  setForm({ number: it.number, room_type: it.room_type, price: it.price, is_available: it.is_available, image: null })
  }

  const del = async (id) => {
    if (!confirm('Eliminar habitación?')) return
    await api.delete(`/rooms/${id}/`)
    await load()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Habitaciones</h1>

      <div className="card">
        {msg && <div className="mb-3 text-green-700 bg-green-50 border border-green-200 rounded p-2 text-sm">{msg}</div>}
        {err && <div className="mb-3 text-red-700 bg-red-50 border border-red-200 rounded p-2 text-sm">{err}</div>}
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Número</label>
            <input className="input" name="number" value={form.number} onChange={onChange} required />
          </div>
          <div>
            <label className="label">Tipo</label>
            <select className="input" name="room_type" value={form.room_type} onChange={onChange}>
              <option value="single">Simple</option>
              <option value="double">Doble</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <div>
            <label className="label">Precio</label>
            <input type="number" step="0.01" className="input" name="price" value={form.price} onChange={onChange} required />
          </div>
          <div className="flex items-center gap-2">
            <input id="is_available" type="checkbox" name="is_available" checked={form.is_available} onChange={onChange} />
            <label htmlFor="is_available" className="label">Disponible</label>
          </div>
          <div>
            <label className="label">Imagen</label>
            <input className="input" type="file" name="image" accept="image/*" onChange={onChange} />
          </div>
          <div className="flex items-end">
            <button disabled={loading} className="btn">{editingId ? 'Actualizar' : 'Crear'}</button>
            {editingId && (
              <button type="button" onClick={() => { setForm(initial); setEditingId(null) }} className="btn btn-secondary ml-2">Cancelar</button>
            )}
          </div>
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map(it => (
          <div key={it.id} className="card">
            {it.image_url && <img src={it.image_url} alt="room" className="w-full h-40 object-cover rounded" />}
            <h3 className="font-semibold mt-2">Hab. {it.number}</h3>
            <p className="text-sm text-gray-600">Tipo: {it.room_type} • Precio: S/ {it.price}</p>
            <p className="text-sm">{it.is_available ? 'Disponible' : 'No disponible'}</p>
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
