# EMI-Pilot 🚀

**Stay ahead of your EMIs**

A fintech MVP web application that helps users track EMIs, calculate EMI stress, and show predictive financial insights.

---

## 📋 Features

- **Track Multiple EMIs**: Manage all your EMIs in one place
- **Financial Health Dashboard**: Real-time EMI stress calculation and health status
- **Smart Insights**: Rule-based financial guidance and alerts
- **EMI Timeline**: Visualize when your EMIs are due throughout the month
- **Interactive Charts**: Visual representation of your financial data
- **No Bank Integration**: Simple manual EMI entry for quick setup

---

## 🛠️ Tech Stack

### Frontend
- **React** with **Next.js** (TypeScript)
- **Tailwind CSS** for styling
- **Recharts** for data visualization

### Backend
- **Node.js** with **Express.js**
- **REST APIs** for data management

### Database
- **MongoDB** (local or cloud)

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd EMI-Pilot
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
The `.env.local` file is already created with default settings:
```env
MONGODB_URI=mongodb://localhost:27017/emi-pilot
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

**If using MongoDB Atlas:**
Replace `MONGODB_URI` with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/emi-pilot
```

### Step 4: Start MongoDB (if using local)
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Or run manually
mongod --dbpath /path/to/data/directory
```

---

## 🚀 Running the Application

### Terminal 1: Start Backend Server
```bash
npm run server
```
The API will run on `http://localhost:4000`

### Terminal 2: Start Frontend (Next.js)
```bash
npm run dev
```
The app will run on `http://localhost:3000`

---

## 📱 Application Flow

1. **Landing Page** (`/`)
   - App introduction and tagline
   - Click "Get Started" to begin

2. **Income Setup** (`/income`)
   - Enter your monthly income
   - Required to calculate EMI stress

3. **Add EMI** (`/add-emi`)
   - Add EMI details (name, amount, due date, etc.)
   - Add multiple EMIs as needed

4. **EMI List** (`/emis`)
   - View all your EMIs as cards
   - Edit or delete EMIs
   - See total monthly EMI amount

5. **Dashboard** (`/dashboard`) ⭐
   - View financial overview
   - EMI stress percentage and health status
   - Interactive charts (Pie chart and Bar chart)
   - Health status indicators:
     - 🟢 **Healthy** (< 30%)
     - 🟡 **Warning** (30-50%)
     - 🔴 **High Risk** (> 50%)

6. **Insights & Alerts** (`/insights`)
   - Personalized financial guidance
   - Rule-based alerts:
     - High financial stress detection
     - Cashflow congestion warnings
     - Early-month payment risks
   - Financial tips and best practices

7. **EMI Timeline** (`/timeline`)
   - Week-wise breakdown of EMIs
   - Visual timeline showing when EMIs are due
   - Highlights weeks with multiple EMIs

---

## 🎨 Design System

### Color Palette
- **Primary**: `#1E3A8A` (Deep Blue)
- **Secondary**: `#3B82F6` (Bright Blue)
- **Success**: `#22C55E` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Danger**: `#EF4444` (Red)
- **Background**: `#F8FAFC` (Light Gray)

---

## 🔌 API Endpoints

### EMI Endpoints
- `GET /api/emis` - Get all EMIs
- `GET /api/emis/:id` - Get single EMI
- `POST /api/emis` - Create new EMI
- `PUT /api/emis/:id` - Update EMI
- `DELETE /api/emis/:id` - Delete EMI
- `GET /api/emis/summary/all` - Get EMI summary

### User Endpoints
- `GET /api/user/income` - Get user income
- `POST /api/user/income` - Update user income

---

## 📊 Core Calculations

### EMI Stress Calculation
```typescript
EMI Stress % = (Total EMI / Monthly Income) × 100
```

### Health Status Rules
- **Healthy**: < 30%
- **Warning**: 30% - 50%
- **High Risk**: > 50%

---

## 🧩 Project Structure

```
EMI-Pilot/
├── pages/              # Next.js pages (routes)
│   ├── index.tsx       # Landing page
│   ├── income.tsx      # Income setup
│   ├── add-emi.tsx     # Add EMI form
│   ├── emis.tsx        # EMI list
│   ├── dashboard.tsx   # Dashboard (main page)
│   ├── insights.tsx    # Insights & alerts
│   └── timeline.tsx    # EMI timeline
├── components/         # Reusable React components
│   ├── EMICard.tsx
│   ├── MetricCard.tsx
│   ├── AlertCard.tsx
│   ├── Navbar.tsx
│   └── LoadingSpinner.tsx
├── lib/                # Utilities and services
│   ├── api.ts          # API service functions
│   └── utils.ts        # Helper functions
├── server/             # Backend Express server
│   ├── index.js        # Server entry point
│   ├── models/         # MongoDB models
│   │   ├── EMI.js
│   │   └── User.js
│   └── routes/         # API routes
│       ├── emi.js
│       └── user.js
├── styles/             # Global styles
│   └── globals.css
├── types/              # TypeScript types
│   └── index.ts
└── package.json
```

---

## 🎯 Key Business Logic

### Insight Generation Rules

1. **High Stress Alert**
   - Triggered when EMI stress > 50%
   - Suggests loan restructuring

2. **Cashflow Congestion**
   - Detects multiple EMIs in the same week
   - Warns about budget planning

3. **Early-Month Risk**
   - Identifies EMIs due before typical salary date (1st)
   - Alerts about maintaining sufficient balance

4. **Multiple EMIs**
   - Notifies when user has more than 3 active EMIs
   - Suggests loan consolidation

---

## 🧪 Testing the App

### Sample Data Entry
1. **Set Income**: ₹50,000
2. **Add EMI 1**: Home Loan, ₹15,000, Due: 5th
3. **Add EMI 2**: Car Loan, ₹8,000, Due: 10th
4. **Add EMI 3**: Personal Loan, ₹5,000, Due: 20th

**Expected Results:**
- Total EMI: ₹28,000
- EMI Stress: 56%
- Health Status: High Risk
- Insights: Multiple alerts including high stress and cashflow warnings

---

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `brew services list` (macOS)
- Check connection string in `.env.local`
- Verify firewall settings if using Atlas

### Port Already in Use
- Frontend (3000): `lsof -ti:3000 | xargs kill`
- Backend (4000): `lsof -ti:4000 | xargs kill`

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🚫 What This App DOES NOT Do

- ❌ No bank account integration
- ❌ No payment processing
- ❌ No user authentication (single-user MVP)
- ❌ No credit bureau data
- ❌ No lending functionality

---

## 🎓 Hackathon Ready

This is a **demo application** designed for hackathons and MVPs. It focuses on:
- ✅ Clear UI/UX
- ✅ Fast setup and demo
- ✅ Decision-support system
- ✅ Educational value
- ✅ No complex integrations

---

## 📝 Future Enhancements (Out of Scope for MVP)

- Multi-user support with authentication
- Bank account integration
- Email/SMS reminders for due dates
- EMI payment tracking
- Credit score integration
- Mobile app version
- Export data to PDF/Excel

---

## 👨‍💻 Development

### Available Scripts
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run server` - Start Express backend server

---

## 📄 License

This is a demo project for educational and hackathon purposes.

---

## 🙋‍♂️ Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API endpoints
3. Verify MongoDB connection
4. Check browser console for frontend errors
5. Check terminal logs for backend errors

---

**Built with ❤️ for financial awareness and EMI management**
