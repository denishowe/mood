import React from 'react'

export default class FeelingInput extends React.Component {

	render() {
		const { feeling, feelingChange } = this.props
		return (
			<div>
				<label>I am feeling &nbsp;
					<select value={ feeling } onChange={ feelingChange }>
						<option value={ '' }>Choose a feeling</option>
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
