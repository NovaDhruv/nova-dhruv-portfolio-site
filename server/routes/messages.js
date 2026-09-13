import { Router } from 'express'
import { Message } from '../models/Message.js'

const router = Router()

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.socket.remoteAddress || ''
}

router.post('/', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      budget: req.body.budget,
      message: req.body.message,
      ipAddress: getClientIp(req),
      userAgent: req.get('user-agent') || '',
    }

    const message = await Message.create(payload)
    res.status(201).json({
      ok: true,
      message: 'Message saved successfully.',
      data: {
        id: message._id,
        createdAt: message.createdAt,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/', async (_req, res, next) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-__v')
      .lean()

    res.json({ ok: true, data: messages })
  } catch (error) {
    next(error)
  }
})

export default router
