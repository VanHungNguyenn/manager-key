require('dotenv').config()
require('module-alias/register')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME

mongoose
	.connect(MONGODB_URI, {
		dbName: DB_NAME,
	})
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((err) => {
		console.log('Error connecting to MongoDB', err)
	})

app.use(router)
app.use((req, res, next) => {
	const error = new Error('Not found')
	error.status = 404
	next(error)
})
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		message: err.message,
	})
})

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
