# mood

Mood App Demo for Unmind

Denis Howe
2018-07-22

Web app served by http://expressjs.com/

## Back end

Node service to store and retrieve check-ins via REST API.

### Post check-in

`POST http://localhost:8888/api`

Request content:
`{"mood": "3", "feeling": "happy", "comment": "Optional"}`

### Fetch check-ins

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

* Average mood
* Number of check-ins
* Table showing past check-ins (mood, feeling, comment, timestamp) most recent first

## Future Extensions

* Real database
* Multi-user
* Edit or delete a check-in
* Disable submit when no feeling selected
* Disable submit on submit
