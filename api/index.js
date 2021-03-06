
// Server API - exports handler function of type request => response

// Simulate a database with an array stored in a file
// https://www.npmjs.com/package/jsonfile

const Storage = require('jsonfile')

class api {

    // Return the store array read from the file
    // object's "data" property or [] if no file yet

    static _loadStore() {
        let content
        try { content = Storage.readFileSync('datastore') } catch(e) { }
        api.store = content ? content.data : []
    }

    // Write to the file an object with the store array as its "data" property

    static _saveStore() {
        Storage.writeFileSync('datastore', { data: api.store })
    }

    // Handle GET request - return list of all stored check-ins

    // GET http://localhost:8888/api
    // [{"mood": 3, "feeling": "happy", "comment": "Optional", "time": "34234234234"}, ...]

    static get(req) {
        if (! api.store) api._loadStore()

        return api.store
    }

    // Handle POST request - store new check-in

    // echo {"mood": 3, "feeling": "happy", "comment": "Optional"} | POST http://localhost:8888/api

    static post(req) {
        let checkIn = req.body

        // Validate input

        if (! checkIn.mood)
            return 'Missing mood'
        const mood = parseInt(checkIn.mood)
        if (checkIn.mood < 1 || checkIn.mood > 7)
            return 'mood should be an integer "1" to "7"' + ' (' + checkIn.mood +')'

        if (! checkIn.feeling)
            return 'Missing feeling'
        if (! checkIn.feeling.match(/^(depressed|optimistic|bored|happy)$/))
            return 'Bad feeling'

        const maxCommentChars = 64
        if (checkIn.comment && checkIn.comment.length > maxCommentChars)
            return 'Comment > ' + maxCommentChars + ' chars'

        checkIn.timestamp = (new Date).getTime()                // ms since 1970

        // Append the new check-in and save store to file

        if (! api.store) api._loadStore()
        api.store.push(checkIn)
        api._saveStore()

        return 'OK'
    }
}

module.exports = req => req.method == 'GET' ? api.get(req) : api.post(req)
