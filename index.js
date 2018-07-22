
// Main app server entry point

// GET http://localhost:8888/		--> Front-end dist/index.html

// POST http://localhost:8888/api	--> Back-end api/index.js


const express = require('express')
const api = require('./api')

const port = 8888

express()
	.use(express.static('dist'))
	.get('/', (req, res) => res.sendFile('index.html'))
	.post('/api', api.post)
	.get('/api', api.get)
	.listen(port, () => console.log('Listening on ' + port))
