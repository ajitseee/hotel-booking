# 🏨 Hotel Booking System

A full-stack hotel booking platform built with React.js, Node.js, and MongoDB. Features separate interfaces for customers and hotel owners with role-based authentication using Clerk.

## ✨ Features

### 🎯 Customer Features
- Browse and search hotels
- View detailed room information
- Book rooms with date selection
- Manage booking history
- User profile management
- Secure authentication

### 🏢 Hotel Owner Features
- Dashboard with analytics
- Add and manage hotels
- View and manage bookings
- Revenue tracking
- Hotel performance metrics
- Business verification system

### 🔐 Authentication
- Dual authentication system (Customer/Hotel Owner)
- Role-based access control
- Seamless role switching
- Secure user management with Clerk

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with hooks
- **React Router 7.6.3** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Clerk** - Authentication and user management
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Clerk Webhooks** - User synchronization
- **Cloudinary** - Image management

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Clerk account
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/hotel-booking-system.git
cd hotel-booking-system
```

2. **Install dependencies**

Frontend:
```bash
cd client
npm install
```

Backend:
```bash
cd server
npm install
```

3. **Environment Variables**

Create `.env` files in both client and server directories:

**Client (.env)**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000
```

**Server (.env)**
```env
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret
PORT=3000
```

4. **Run the application**

Backend:
```bash
cd server
npm run server
```

Frontend:
```bash
cd client
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:3000` for the API.

## 📁 Project Structure

```
hotel-booking-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── assets/         # Static assets
│   │   └── hooks/          # Custom React hooks
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── configs/           # Configuration files
│   ├── server.js          # Entry point
│   └── package.json
└── README.md
```

## 🔧 Key Components

### Frontend Components
- **Navbar** - Navigation with role-based options
- **Hero** - Landing page hero section
- **HotelCard** - Hotel listing component
- **Dashboard** - Hotel owner analytics
- **Authentication** - Separate login/signup flows

### Backend Models
- **User** - User profiles with role management
- **Hotel** - Hotel information and details
- **Booking** - Reservation management
- **Room** - Room types and availability

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd client
vercel --prod
```

### Backend (Vercel)
```bash
cd server
vercel --prod
```

## 📱 API Endpoints

### Authentication
- `POST /api/webhooks/clerk` - Clerk webhook handler

### Hotels
- `GET /api/hotels` - Get all hotels
- `POST /api/hotels` - Create new hotel
- `GET /api/hotels/:id` - Get hotel by ID

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ajit Singh**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Clerk](https://clerk.dev/) for authentication services
- [Vercel](https://vercel.com/) for deployment platform
- [MongoDB](https://mongodb.com/) for database services
- [Tailwind CSS](https://tailwindcss.com/) for styling framework

---

⭐ Star this repo if you find it helpful!
