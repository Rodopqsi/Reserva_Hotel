import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const api = axios.create({
  baseURL,
})

// Helper to send multipart form with possible file
export function toFormData(obj) {
  const fd = new FormData()
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    // For dates, strings are fine
    fd.append(key, value)
  })
  return fd
}
