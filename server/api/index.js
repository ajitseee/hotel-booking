export default async function handler(req, res) {
  try {
    // Simple test response first
    if (req.url === '/api/test' || req.url === '/test') {
      return res.status(200).json({ 
        message: 'Hotel Booking API is Working!',
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
      });
    }

    // Default response
    return res.status(200).json({ 
      message: 'API IS WORKING FINE',
      timestamp: new Date().toISOString(),
      environment: 'production'
    });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
