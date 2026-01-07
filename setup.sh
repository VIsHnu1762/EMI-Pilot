#!/bin/bash

echo "🚀 EMI-Pilot Quick Start Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null
then
    if pgrep -x "mongod" > /dev/null
    then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is installed but not running"
        echo "   Start it with: brew services start mongodb-community"
        echo "   Or use MongoDB Atlas (cloud)"
    fi
else
    echo "⚠️  MongoDB not found locally. Make sure to:"
    echo "   - Install MongoDB locally, OR"
    echo "   - Update .env.local with MongoDB Atlas connection string"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To run the application:"
echo "  1. Start backend:  npm run server"
echo "  2. Start frontend: npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
