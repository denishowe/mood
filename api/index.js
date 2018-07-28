
// Server API - exports handler function of type request => response

// Simulate database with file-based store

const Storage = require('node-storage')

const maxCommentChars = 64

module.exports = (req) => {

	const store = new Storage('data')
	let maxId = store.get('maxId') 						// Last stored id
	maxId = maxId ? parseInt(maxId) : 0;

	// Handle GET request - list all stored check-ins

	// GET http://localhost:8888/api
	// [{"mood": 3, "feeling": "happy", "comment": "Optional", "time": "2018-07-22T16:55:00"}, ...]

	const get = req => {
		let res = []
		for (let id = 1; id <= maxId; id++)
		{
			const data = store.get(id.toString())
			res.push(JSON.parse(data))
		}

		// Sort events most recent first

		res.sort( (a, b) => b.timestamp - a.timestamp )

		return JSON.stringify(res)
	}

	// Handle POST request - store new check-in

	// echo {"mood": 3, "feeling": "happy", "comment": "Optional"} | POST http://localhost:8888/api

	const post = req => {
		let data = req.body									// mood, feeling, comment

		// Validate input

		const mood = parseInt(data.mood)
		if (data.mood < 1 || data.mood > 7)
			return 'mood should be an integer "1" to "7"' + ' (' + data.mood +')'

		if (! data.feeling)
			return 'Missing feeling'
		if (! data.feeling.match(/^(depressed|optimistic|bored|happy)$/))
			return 'Bad feeling'

		if (data.comment && data.comment.length > maxCommentChars)
			return 'Comment > ' + maxCommentChars + ' chars'

		data.timestamp = (new Date).getTime()				// ms since 1970

		// Store the new post with the next sequential id starting from '1'

		const id = (maxId + 1).toString()					// This post's id
		store.put(id, JSON.stringify(data))
		store.put('maxId', id)								// Update id in store

		return 'OK'
	}

	return req.method == 'GET' ? get(req) : post(req)
}
