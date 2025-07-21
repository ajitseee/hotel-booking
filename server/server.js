import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js'

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));