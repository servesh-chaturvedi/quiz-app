require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500
const app = express()

connectDB()
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
app.use(express.json())

app.use('/questions', require('./routes/questionRoute'))

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})
