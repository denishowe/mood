import React from 'react'
import { Link } from 'react-router-dom'

export default class InputForm extends React.Component {

	render() {
		return (
			<div>
				<p>Input Form</p>
				<Link to="/insights">Insights Report</Link>
			</div>
		)
	}
}
