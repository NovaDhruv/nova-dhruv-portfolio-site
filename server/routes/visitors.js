import { Router } from 'express'
import { Message } from '../models/Message.js'
import { Visitor } from '../models/Visitor.js'

const router = Router()

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.socket.remoteAddress || ''
}

router.post('/', async (req, res, next) => {
  try {
    const sessionId = String(req.body.sessionId || '').trim()
    if (!sessionId) {
      return res.status(400).json({ ok: false, message: 'sessionId is required.' })
    }

    const visitor = await Visitor.findOneAndUpdate(
      { sessionId },
      {
        $set: {
          path: req.body.path || '/',
          referrer: req.body.referrer || '',
          userAgent: req.get('user-agent') || '',
          ipAddress: getClientIp(req),
          lastSeenAt: new Date(),
        },
        $inc: { visits: 1 },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )

    res.status(201).json({
      ok: true,
      data: {
        id: visitor._id,
        visits: visitor.visits,
        lastSeenAt: visitor.lastSeenAt,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/summary', async (_req, res, next) => {
  try {
    const [uniqueVisitors, totalMessages, latestMessages] = await Promise.all([
      Visitor.countDocuments(),
      Message.countDocuments(),
      Message.find().sort({ createdAt: -1 }).limit(5).select('name email service createdAt').lean(),
    ])

    res.json({
      ok: true,
      data: {
        uniqueVisitors,
        totalMessages,
        latestMessages,
      },
    })
  } catch (error) {
    next(error)
  }
})

export default router
