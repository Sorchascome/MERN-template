const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      mainRouter = require('./routes/main')

const PORT = process.env.PORT || 5000,
      uri = 'mongodb+srv://defaultuser:dalMSmubLYpkykYa@brcluster-bzf8f.mongodb.net/mern?retryWrites=true&w=majority',
      app = express()

// Routes and middleware
app.use(bodyParser.json())
app.use(cors())
app.use('/', mainRouter)

// Error handlers
app.use((req, res) => {
  res.status(404).send()
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send()
})

// Mongo + GridFS
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', err => {
  if (err) console.error('Database connection error', err)
  else console.log("MongoDB database connection established successfully") 
})

// Start server
app.listen(PORT, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log('Started at http://localhost:' + PORT)
})

module.exports = app
