import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectDatabase } from './config/db.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import messagesRouter from './routes/messages.js'
import visitorsRouter from './routes/visitors.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://127.0.0.1:5173',
  credentials: true,
}))
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'Nova Dhruv Portfolio API',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/messages', messagesRouter)
app.use('/api/visitors', visitorsRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(rootDir, 'dist')))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(rootDir, 'dist', 'index.html'))
  })
}

app.use(notFound)
app.use(errorHandler)

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Portfolio API running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
