
// Server API

// GET http://localhost:8888/
// Serve dist/index.html

// POST http://localhost:8888/api
// {"mood": 3, "feeling": "happy", "comment": "Optional"}

// GET http://localhost:8888/api
// [{"mood": 3, "feeling": "happy", "comment": "Optional", "time": "2018-07-22T16:55:00"}, ...]


const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

const port = 8888
app.listen(port, () => console.log('Listening on ' + port))
