export function notFound(req, res) {
  res.status(404).json({
    ok: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
}

export function errorHandler(error, _req, res, _next) {
  void _next

  if (error.name === 'ValidationError') {
    const details = Object.values(error.errors).map((item) => item.message)
    return res.status(400).json({
      ok: false,
      message: details[0] || 'Validation failed.',
      details,
    })
  }

  if (error.name === 'MongoServerError' && error.code === 11000) {
    return res.status(409).json({
      ok: false,
      message: 'Duplicate record detected.',
    })
  }

  console.error(error)
  res.status(500).json({
    ok: false,
    message: 'Server error. Please try again later.',
  })
}
