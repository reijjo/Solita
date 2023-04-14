const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const app = express()

const db_conn = require('./utils/dbConnection')
const { connectDB } = db_conn
connectDB()

const testRouter = require('./controllers/test')
const journeyRouter = require('./controllers/journeys')
const stationRouter = require("./controllers/stations");

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/test', testRouter)
app.use('/api/journeys', journeyRouter)
app.use("/api/stations", stationRouter);


app.use(middleware.unknownEndpoint)

module.exports = app
