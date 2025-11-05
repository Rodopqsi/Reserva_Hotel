# Sistema de Reservas de Hotel (Examen 03)

Stack: Django (DRF) + MySQL + React (Vite) + Axios + Tailwind CSS.

Incluye:
- 2 modelos relacionados: `Room` (Habitación, con imagen) y `Reservation` (Reserva, FK a Room)
- CRUD completo para ambas tablas mediante API REST
- Carga y visualización de imágenes
- Frontend con formularios y listas, navegación con React Router

## Requisitos previos
- Python 3.10+ y Node 18+
- MySQL en local o gestionado (Railway/Render)

## Pasos rápidos (Windows PowerShell)

1) Backend
```powershell
cd backend
py -3 -m venv .venv ; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
cp .env.example .env  # si cp no existe, crea manualmente .env a partir del ejemplo
# Crea la base de datos en MySQL y actualiza credenciales en .env
python manage.py makemigrations hotel ; python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

2) Frontend
```powershell
cd ..\frontend
npm install
copy .env.example .env
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:8000/api

## Despliegue (opcional)
Recomendado: Railway para MySQL + servicio web para Django y otro para Vite build estático.

- Backend
  - Environment: valores de `MYSQL_*`, `DEBUG=0`, `ALLOWED_HOSTS` con dominio.
  - Ejecuta migraciones en el arranque.
  - Para media en producción, usa Cloudinary (ver guía `DEPLOYMENT.md`).

- Frontend
  - `npm run build` genera `dist/`. Sirve con el host gratuito que prefieras o activa un servicio estático en Railway.

## Estructura
- `backend/` Django + DRF, app `hotel`
- `frontend/` React + Vite + Tailwind

## Rúbrica cumplida
- Modelos con FK (Room 1..N Reservation)
- CRUD completo para ambas en API + UI
- Subida/visualización de imagen para Room
- UI funcional con navegación
- Guía de despliegue y variables de entorno

# Reserva_Hotel
