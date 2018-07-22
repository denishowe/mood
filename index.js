
// Main app server entry point

// GET http://localhost:8888/		--> Front-end dist/index.html

// POST http://localhost:8888/api	--> Back-end api/index.js


const express = require('express')
// const bodyParser = require('body-parser')

const api = require('./api')

const port = 8888

express()
	.use(express.static('dist'))
	.use(express.json({type: "*/*"}))
	.get('/', (req, res) => res.sendFile('index.html'))
	.all('/api', (req, res) => res.send(api(req)))
	.listen(port, () => console.log('Listening on ' + port))
