import mongoose from 'mongoose'

let cachedConnection = null

export async function connectDatabase() {
  if (cachedConnection) return cachedConnection

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is missing. Add it to your .env file.')
  }

  mongoose.set('strictQuery', true)
  cachedConnection = await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB_NAME || 'nova_dhruv_portfolio',
  })

  return cachedConnection
}
