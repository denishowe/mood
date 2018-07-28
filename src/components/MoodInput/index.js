import React from 'react'

export default class MoodInput extends React.Component {

	constructor(props) {
		super(props)
		this.size = 150					// Half the SVG width and height

		this.state = { happy: 4 }		// Neutral on a scale of 1=sad .. 7=happy

		this.happyChange = this.happyChange.bind(this)
	}

	// Mood changed - redraw eyes and mouth

	happyChange(event) {

		// Convert input value 1..7 to -3 .. +3 for ease of scaling

		const happyIn = event ? event.target.value : this.state.happy
		this.props.moodChange(event)
		this.setState({happy: happyIn})
		const happy = parseInt(happyIn) - 4

		// Eyes

		const eyeSep = 0.3 * this.size,
			  eyeRadius = 50 + 2*happy,					// Happier => bigger
			  eyeY = 0.8 * this.size - 4*happy; 		// Happier => higher
		if (this.eyes) this.eyes.map(e => e.remove())
		this.eyes = [-1, 1].map(leftRight =>
								this.draw.circle(eyeRadius)
									.cx(this.size + leftRight * eyeSep)
									.cy(eyeY))
		// Mouth

		const width = 0.8 * this.size + 5*happy,		// Happier => wider
			  leftX = this.size - width/2,
			  rightX = this.size + width/2,
			  cornerY = 1.35 * this.size - 4 * happy, 	// Happier => higher corners
			  left = `${ leftX },${ cornerY }`,
			  right = `${ rightX },${ cornerY }`,

			  controlX = this.size,
			  controlY = cornerY + 25 * happy, 			// Happier => lower in middle
			  control = `${ controlX },${ controlY }`;

		if (this.mouth) this.mouth.remove()
		this.mouth = this.draw.path(`M${ left } Q${ control } ${ right }`)
			.stroke({ width: 15, linecap: 'round' })
			.fill('none')
	}

	render() {
		this.slider = (
			<input type={ 'range' } min={ 1 } max={ 7 } value={ this.state.happy }
				   autoComplete={ 'off' } autoFocus={ 'autofocus' }
				   onChange={ this.happyChange } />
		)

		return (
			<div className={ 'moodInput' }>
				<p>My mood today is</p>
				{ this.slider }
				<div id={ 'face' }> </div>
			</div>
		)
	}

	componentDidMount() {				// Component added to DOM

		// Create the SVG on element with id 'face' using svg.min.js loaded in head

		this.draw = SVG('face').size(2*this.size, 2*this.size)

		// Draw face outline

		this.draw.circle(1.8 * this.size)
			.cx(this.size).cy(this.size)
			.fill('yellow')
			.stroke({ width: 5 });

		this.happyChange()				// Initial eyes and mouth
	}
}
