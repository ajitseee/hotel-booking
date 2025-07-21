import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "../configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from '../controllers/clerkWebhooks.js'

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(cors())

// Special middleware for Clerk webhooks (must be before express.json())
app.use('/api/webhooks/clerk', express.raw({ type: 'application/json' }), clerkWebhooks)

// Regular middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Clerk middleware
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send("API IS WORKING FINE"))
app.get('/api', (req, res) => res.send("API IS WORKING FINE"))

// Connect to database only when needed
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }
  
  try {
    await connectDB();
    isConnected = true;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// Vercel serverless function handler
export default async function handler(req, res) {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
