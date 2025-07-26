import express from "express"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: "Hotel Booking API is Working!",
    timestamp: new Date().toISOString(),
    status: "healthy"
  })
})

app.get('/api/test', (req, res) => {
  res.json({
    message: "Test endpoint working!",
    env: {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Missing',
      CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET ? 'Set' : 'Missing'
    },
    timestamp: new Date().toISOString()
  })
})

export default function handler(req, res) {
  return app(req, res)
}
