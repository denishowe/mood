# mood

Mood App Demo

Denis Howe
2018-07-30

Web app served by http://expressjs.com/

Spec: 2018-07-06 email "Unmind coding challenge for Denis"

## Back end

Node service to store and retrieve check-ins via REST API.

Run server (combined web server for REST API and front-end):

`npm run start`

### Post a new check-in to the API

`POST http://localhost:8888/api`

Request content:
`{"mood": "3", "feeling": "happy", "comment": "Optional"}`

### Fetch all check-ins from the API

`GET http://localhost:8888/api`

Response content:
`[{"mood": "3", "feeling": "happy", "comment": "Optional", "timestamp": "1532819443717"}, ...]`

timestamp = milliseconds since 1970

## Front end

Two pages built with React.

### Check In

http://localhost:8888/

Form with:

* Mood: 1 bad .. 7 excellent
* Feeling: one of "depressed", "optimistic", "bored", "happy"
* Optional comment

### Mood Insights

http://localhost:8888/insights

Report showing:

* Average mood
* Number of check-ins
* Table of past check-ins (mood, feeling, comment, timestamp) most recent first

## Future Improvements

* Better submit feedback
* Real database
* Multi-user
* Edit or delete a check-in
* Better styling
