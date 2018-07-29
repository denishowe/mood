
// Main app server entry point

// GET http://localhost:8888/		--> Front-end dist/index.html

// POST http://localhost:8888/api	--> Back-end api/index.js


const express = require('express')
const path = require('path')

const api = require('./api')

const port = 8888

const publicDir = path.resolve(__dirname, 'dist')

express()
	.use(express.static(publicDir))
	.use(express.json({type: "*/*"}))
	.all('/api', 	  (req, res) => res.send(api(req)))
	.get('*',		  (req, res) => res.sendFile(publicDir + '/index.html'))
	.listen(port, () => console.log('Listening on ' + port))
