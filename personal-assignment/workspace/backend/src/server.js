const express = require('express')
const path = require('path')
const cors = require('cors');

const mongoose = require('mongoose')

require('dotenv').config()

const api = require('./api')

const uri = process.env.MONGO_URI
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

// 連接到 MongoDB
mongoose
	.connect(uri, options)
	.then(() => {
		console.log('MongoDB is connected')
	})
	.catch((err) => {
		console.log(err)
	})
const app = express()

const PORT = 3000

app.use(express.json())
app.use(cors())

// 以上是 Middleware
app.use('/', api)

// 這是 default router，也就是所有上方沒有定義的 url request 最後都會由他處理。
app.get('*', (req, res) => {
	res.status(404).json({ error: 'Page did not exist' })
})


app.use((err, req, res, next) => {
	const status = err.status || 500
	if (status === 500) {
		console.log('The server errored when processing a request')
		console.log(err)
	}

	res.status(status)
	res.send({
		status: status,
		message: err.message,
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})