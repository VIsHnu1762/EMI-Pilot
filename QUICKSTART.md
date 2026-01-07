# Quick Start Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Start Backend (Terminal 1)
```bash
npm run server
```

## 3. Start Frontend (Terminal 2)
```bash
npm run dev
```

## 4. Open Browser
Navigate to: http://localhost:3000

## Sample Test Flow
1. Go to http://localhost:3000
2. Click "Get Started"
3. Enter Income: 50000
4. Add EMI: Home Loan, 15000, Due: 5
5. Add EMI: Car Loan, 8000, Due: 10
6. View Dashboard to see charts and stress calculation
7. Check Insights for financial guidance
8. View Timeline to see EMI schedule

## MongoDB Setup

### Option 1: Local MongoDB
```bash
brew services start mongodb-community
```

### Option 2: MongoDB Atlas (Cloud)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create cluster and get connection string
3. Update `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/emi-pilot
```

## Common Issues

**Port 3000 in use:**
```bash
lsof -ti:3000 | xargs kill
```

**Port 4000 in use:**
```bash
lsof -ti:4000 | xargs kill
```

**MongoDB connection error:**
- Check if MongoDB is running
- Verify connection string in .env.local
- Check firewall/network settings
