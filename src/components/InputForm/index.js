import React from 'react'
import { Link } from 'react-router-dom'

import MoodInput from '../MoodInput'
import FeelingInput from '../FeelingInput'

export default class InputForm extends React.Component {

	constructor(props) {
		super(props)

		this.initialState = {
			mood: 4,
			feeling: '',
			comment: '',
			submitted: false
		}

		this.state = this.initialState

		this.moodChange = this.moodChange.bind(this)
		this.feelingChange = this.feelingChange.bind(this)
		this.commentChange = this.commentChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.resetForm = this.resetForm.bind(this)
	}

	moodChange(e) {
		this.setState({ mood: e.target.value })
	}

	feelingChange(e) {
		this.setState({ feeling: e.target.value })
	}

	commentChange(e) {
		this.setState({ comment: e.target.value })
	}

	// On submit, send check-in to API, disable submit button for 2s then reset form

	handleSubmit(e) {
		e.preventDefault()
		if (! this.state.feeling) return
		const checkin = this.state
		checkin.submitted = undefined
		const post = { method: 'POST',
					   body: JSON.stringify(checkin),
					   headers: { 'Content-Type': 'application/json' } }
		window.fetch('/api', post)
			.then(res => res.text())
			.then(text => {
				if (text != 'OK') {
					alert(text)
					return
				}
				this.setState({ submitted: true })
				setTimeout(this.resetForm, 2000)
			})
	}

	resetForm() {
		this.setState(this.initialState)
	}

	render() {

		const { mood, feeling, comment, submitted } = this.state
		const disabled = ! feeling || submitted
		const submitLabel = submitted ? 'Submitted' : 'Submit'
		const title = submitted ? 'Please wait' : feeling ? '' : 'Select a feeling above'

		return (
			<div>
				<form onSubmit={ this.handleSubmit } >

					<MoodInput mood={ mood } moodChange={ this.moodChange } />

					<FeelingInput feeling={ feeling } feelingChange={ this.feelingChange } />

					<label>
						<p>Comment (optional):</p>
						<textarea value={ comment } onChange={ this.commentChange }/>
					</label>
					<br/>

					<input type="submit" className={ 'submit' }
						value={ submitLabel } disabled={ disabled } title={ title } />

				</form>
				<p></p>
				<p><Link to="/insights">Insights Report</Link></p>
			</div>
		)
	}
}
