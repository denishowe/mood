import React from 'react'
import { Link } from 'react-router-dom'

import MoodInput from '../MoodInput'
import FeelingInput from '../FeelingInput'

export default class InputForm extends React.Component {

	constructor(props) {
		super(props)

		this.state = { mood: 4, feeling: '', comment: '' }
		this.moodChange = this.moodChange.bind(this)
		this.feelingChange = this.feelingChange.bind(this)
		this.commentChange = this.commentChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	moodChange(e) {
		if (! e) return
		console.log('moodChange', e.target.value)
		this.setState({ mood: e.target.value })
	}

	feelingChange(e) {
		this.setState({ feeling: e.target.value })
	}

	commentChange(e) {
		this.setState({ comment: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault()
		if (! this.state.feeling)
			return
		const post = { method: 'POST',
					   body: JSON.stringify(this.state),
					   headers: { 'Content-Type': 'application/json' } }
		window.fetch('/api', post)
	}

	render() {
		return (
			<div>
				<form onSubmit={ this.handleSubmit } >
					<MoodInput moodChange={ this.moodChange } />
					<FeelingInput feelingChange={ this.feelingChange } />
					<label>
						<p>Comment (optional):</p>
						<textarea value={ this.state.comment } onChange={ this.commentChange }/>
					</label>
					<br/>
					<input type="submit" value="Submit" className={ 'submit' } />
				</form>
				<p></p>
				<p><Link to="/insights">Insights Report</Link></p>
			</div>
		)
	}
}
