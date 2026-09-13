import mongoose from 'mongoose'

const visitorSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    path: {
      type: String,
      trim: true,
      default: '/',
    },
    referrer: {
      type: String,
      trim: true,
      default: '',
    },
    userAgent: {
      type: String,
      trim: true,
      default: '',
    },
    ipAddress: {
      type: String,
      trim: true,
      default: '',
    },
    visits: {
      type: Number,
      default: 1,
    },
    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

visitorSchema.index({ lastSeenAt: -1 })

export const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema)
