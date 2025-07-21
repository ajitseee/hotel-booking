export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hotel Booking API Test Endpoint',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}
