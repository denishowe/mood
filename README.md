# mood

Mood App Demo for Unmind

Denis Howe
2018-07-22

Web app served by http://expressjs.com/

## Back end

Node service to store and retrieve check-ins via REST API.

Simulate database with https://www.npmjs.com/package/node-storage - file-based store

### Post check-in

POST http://localhost:8888/api

`{"mood": 3, "feeling": "happy", "comment": "Optional"}`

### Fetch check-ins

GET http://localhost:8888/api

`[{"mood": 3, "feeling": "happy", "comment": "Optional", "time": "2018-07-22T16:55:00"}, ...]`

## Front end

Two pages built with React.

### Check In

http://localhost:8888/

Form with:

* Mood: 1 bad to and 7 excellent
* Feeling: "depressed", "optimistic", "bored", "happy"
* Optional comment

### Mood Insights

http://localhost:8888/insights

Table showing:

* Average mood
* Number of check-ins
* Past check-ins (mood, feeling, comment, timestamp) most recent first

## Future Extensions

* Multi-user
* Edit, delete check-in
