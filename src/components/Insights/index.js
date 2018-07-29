import React from 'react'
import { Link } from 'react-router-dom'

export default class Insights extends React.Component {

	constructor(props) {
		super(props)

		this.state = { checkins: [] }
	}

	formatTimestamp(s)
	{
		return (new Date(s)).toISOString().slice(0, 19).replace('T', ' ')
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
		let nCheckins = 0;
		let meanMood = 0;
		checkins.forEach(c => {
			c.id = nCheckins++;
			meanMood += parseInt(c.mood)
		})
		meanMood /= nCheckins
		meanMood = Math.floor(meanMood)

		const rows = checkins.map(c => this.row(c))

		return (
			<div>
				<Link to="/">Home</Link>
				<h1>Insights Report</h1>
				<p>
					Number of check-ins: { nCheckins }
					&nbsp; &nbsp; &nbsp;
					Average mood: { meanMood }
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
