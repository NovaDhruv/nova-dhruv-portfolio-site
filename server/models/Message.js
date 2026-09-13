import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
      default: '',
    },
    service: {
      type: String,
      trim: true,
      maxlength: 120,
      default: 'Portfolio / Landing Page',
    },
    budget: {
      type: String,
      trim: true,
      maxlength: 80,
      default: '',
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    source: {
      type: String,
      trim: true,
      default: 'portfolio-contact-form',
    },
    ipAddress: {
      type: String,
      trim: true,
      default: '',
    },
    userAgent: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'read', 'archived'],
      default: 'new',
    },
  },
  { timestamps: true }
)

messageSchema.index({ createdAt: -1 })
messageSchema.index({ email: 1 })

export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)
