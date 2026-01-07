# Django Backend Setup Instructions

## Quick Setup

### 1. Install Python Dependencies
```bash
cd backend
pip3 install -r requirements.txt
```

### 2. Run Migrations (Create Database)
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

### 3. Start Django Server
```bash
python3 manage.py runserver 0.0.0.0:4000
```

The API will run on **http://localhost:4000**

## API Endpoints

All endpoints match the original Node.js API:

- `GET /api/health` - Health check
- `GET /api/emis` - Get all EMIs
- `GET /api/emis/:id` - Get single EMI
- `POST /api/emis` - Create EMI
- `PUT /api/emis/:id` - Update EMI
- `DELETE /api/emis/:id` - Delete EMI
- `GET /api/emis/summary/all` - Get summary
- `GET /api/user/income` - Get income
- `POST /api/user/income` - Update income

## Database

- Uses **SQLite** (no MongoDB needed!)
- Database file: `backend/db.sqlite3`
- Automatically created on first run

## Admin Panel (Optional)

Create a superuser to access Django admin:
```bash
python3 manage.py createsuperuser
```

Then visit: http://localhost:4000/admin

## Advantages of Django Backend

✅ **No MongoDB required** - Uses SQLite (built-in)
✅ **Easier setup** - No database installation needed
✅ **Admin panel** - Built-in UI to manage data
✅ **Better validation** - Django ORM validation
✅ **Python ecosystem** - Easy to extend

## Testing the API

```bash
# Health check
curl http://localhost:4000/api/health

# Get all EMIs
curl http://localhost:4000/api/emis

# Get income
curl http://localhost:4000/api/user/income
```
