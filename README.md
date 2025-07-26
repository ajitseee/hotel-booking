# 🏨 BookMyStay - Full-Stack Hotel Booking Platform

A modern, full-stack hotel booking application with separate authentication flows for customers and hotel owners, built with React, Node.js, and MongoDB.

## 🚀 Project Overview

BookMyStay is a comprehensive hotel booking platform that provides distinct user experiences for customers seeking accommodations and hotel owners managing their properties. The application features role-based authentication, real-time booking management, and a scalable serverless architecture.

## ✨ Key Highlights

### 🔐 **Dual Authentication System**
- **Customer Portal**: Seamless booking experience with personalized dashboard
- **Hotel Owner Portal**: Complete property management suite with analytics
- **Role-based Access Control**: Secure separation of user types using Clerk authentication
- **Real-time User Synchronization**: Webhook-driven MongoDB integration

### 🏗️ **Scalable Architecture**
- **Serverless Deployment**: Optimized for Vercel with automatic scaling
- **RESTful API Design**: Clean, maintainable backend architecture
- **Responsive UI**: Mobile-first design with Tailwind CSS
- **Database Optimization**: Efficient MongoDB schema with indexing

### 📊 **Business Features**
- **Advanced Search & Filtering**: Location, price, amenities, and availability
- **Real-time Booking Management**: Instant confirmations and updates
- **Revenue Analytics**: Dashboard for hotel owners with booking insights
- **Multi-property Support**: Manage multiple hotels from single account

## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.0** - Modern component-based UI development
- **React Router 7.6.3** - Client-side routing and navigation
- **Tailwind CSS 4.1.11** - Utility-first responsive design
- **Vite** - Fast build tool and development server
- **Clerk React** - Authentication and user management

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB & Mongoose** - NoSQL database with ODM
- **Clerk Express** - Server-side authentication middleware
- **Svix** - Webhook processing and verification

### **DevOps & Deployment**
- **Vercel** - Serverless deployment platform
- **Git & GitHub** - Version control and collaboration
- **Environment Variables** - Secure configuration management
- **Webhook Integration** - Real-time data synchronization

### **Development Tools**
- **ESLint** - Code linting and quality assurance
- **Nodemon** - Development server auto-restart
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 🏆 Key Achievements

### **Technical Excellence**
- ✅ **100% Serverless Architecture** - Zero server maintenance overhead
- ✅ **Role-based Authentication** - Secure user separation and access control
- ✅ **Real-time Data Sync** - Webhook-driven user management
- ✅ **Responsive Design** - Seamless experience across all devices
- ✅ **RESTful API** - Clean, scalable backend architecture

### **Business Impact**
- 🎯 **Dual User Experience** - Optimized interfaces for customers and hotel owners
- 📈 **Scalable Revenue Model** - Support for multiple properties and bookings
- 🔒 **Enterprise Security** - Production-ready authentication system
- 🚀 **Performance Optimized** - Fast loading times and efficient data handling

## 📁 Project Structure

```
BookMyStay/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route-based page components
│   │   ├── assets/        # Static assets and images
│   │   └── main.jsx       # Application entry point
│   ├── public/            # Public static files
│   └── vercel.json        # Frontend deployment config
│
├── server/                # Node.js backend API
│   ├── api/               # Serverless function handlers
│   ├── controllers/       # Business logic controllers
│   ├── models/           # MongoDB data models
│   ├── configs/          # Database and service configs
│   └── vercel.json       # Backend deployment config
│
└── README.md             # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Clerk account for authentication
- Vercel account for deployment

### Installation
```bash
# Clone the repository
git clone https://github.com/ajitseee/hotel-booking.git
cd hotel-booking

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Configure environment variables
# Create .env files in both client and server directories
```

### Environment Variables
```bash
# Client (.env)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=your_api_url

# Server (.env)
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret
```

### Development
```bash
# Start frontend (client directory)
npm run dev

# Start backend (server directory)
npm run server
```

## 🌐 Live Demo

- **Frontend**: [BookMyStay Client](https://your-frontend-url.vercel.app)
- **Backend API**: [BookMyStay API](https://hotelajit2346980.vercel.app)
- **Repository**: [GitHub](https://github.com/ajitseee/hotel-booking)

## 📈 Resume-Ready Highlights

### **Project Name**: BookMyStay - Full-Stack Hotel Booking Platform

### **Key Points for Resume**:
- 🔧 **Developed a full-stack hotel booking platform** with React, Node.js, and MongoDB
- 🔐 **Implemented dual authentication system** with role-based access control using Clerk
- ☁️ **Deployed serverless architecture** on Vercel with automatic scaling
- 🔄 **Built real-time webhook integration** for user synchronization between Clerk and MongoDB
- 📱 **Created responsive UI** with Tailwind CSS supporting both mobile and desktop
- 🏗️ **Designed RESTful API** with Express.js and MongoDB for scalable backend
- 🎯 **Architected separate user experiences** for customers and hotel property managers
- 📊 **Integrated analytics dashboard** for business intelligence and revenue tracking

### **Technical Skills Demonstrated**:
- **Frontend**: React 19, React Router, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Clerk, JWT, Role-based Access Control
- **DevOps**: Vercel Deployment, Serverless Functions, Webhook Integration
- **Database**: MongoDB Schema Design, Data Modeling, Query Optimization
- **Version Control**: Git, GitHub, Collaborative Development

## 👨‍💻 Developer

**Ajit Kumar**
- GitHub: [@ajitseee](https://github.com/ajitseee)
- Repository: [BookMyStay](https://github.com/ajitseee/hotel-booking)

## 📈 Future Enhancements

- 💳 Payment Gateway Integration (Stripe/PayPal)
- 📧 Email Notification System
- 🌍 Multi-language Support
- 📱 Mobile Application (React Native)
- 🤖 AI-powered Recommendation Engine
- 📊 Advanced Analytics Dashboard

---

*Built with ❤️ using modern web technologies for scalable, production-ready deployment*
