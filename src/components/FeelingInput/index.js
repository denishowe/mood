import React from 'react'

export default class FeelingInput extends React.Component {

	render() {
		return (
			<div>
				<label>I am feeling &nbsp;
					<select onChange={ this.props.feelingChange }>
						<option>Choose a feeling</option>
						<option value="depressed">Depressed</option>
						<option value="optimistic">Optimistic</option>
						<option value="bored">Bored</option>
						<option value="happy">Happy</option>
					</select>
				</label>
			</div>
		)
	}
}
