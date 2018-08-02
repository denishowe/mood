import React from 'react'
import { Link } from 'react-router-dom'

export default class Insights extends React.Component {

    constructor(props) {
        super(props)

        this.state = { checkins: [] }
    }

    // Given a time in milliseconds since 1970 (the standard representation
    // in JavaScript), return a string like "2018-08-01 22:45:50" based on
    // ISO format (the only sensible date format) in the local time zone

    formatTimestamp(s)
    {
        const z = (new Date(s)).getTimezoneOffset() * 60 * 1000     // ms

        return ((new Date(s - z))   // To local time
            .toISOString()          // E.g. 2018-08-01T22:55:21.821Z
            .slice(0, 19)           // Drop ms and zone parts
            .replace('T', ' '))     // More human-readable
    }

    row(checkin) {
        const t = this.formatTimestamp(checkin.timestamp)

        return (
            <tr key={ checkin.id }>
                <td>{ checkin.mood }</td>
                <td>{ checkin.feeling }</td>
                <td>{ checkin.comment }</td>
                <td>{ t }</td>
            </tr>
        )
    }

    render() {

        const checkins = this.state.checkins
        // Add ids, find mean mood
        let nCheckins = checkins.length;
        let meanMood = '-'
        if (nCheckins)
        {
            const total = checkins.reduce((a, b) => a + parseInt(b.mood), 0);
            meanMood = Math.floor(10 * total / nCheckins) * 0.1
            checkins.forEach((c, i) => { c.id = i })
        }

        const rows = checkins.map(c => this.row(c))

        return (
            <div>
                <Link to="/">Home</Link>
                <h1>Insights Report</h1>
                <p>
                    <span id={ 'nCheckins' }>Number of check-ins: { nCheckins }</span>
                    <span>Average mood: { meanMood }</span>
                </p>
                <table>
                    <tbody>
                        <tr>
                            <th>Mood</th>
                            <th>Feeling</th>
                            <th>Comment</th>
                            <th>Time</th>
                        </tr>
                        { rows }
                    </tbody>
                </table>
            </div>
        )
    }

    // Sort check-ins most recent first

    order(a, b) { return b.timestamp - a.timestamp }

    componentDidMount() {
        window.fetch('/api')
            .then(res => res.json())
            .then(json => this.setState({ checkins: json.sort(this.order) }))
    }
}
