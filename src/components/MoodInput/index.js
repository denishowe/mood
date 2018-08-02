import React from 'react'
import ReactDOM from 'react-dom'

export default class MoodInput extends React.Component {

    constructor(props) {
        super(props)
        this.size = 150                 // Half the SVG width and height
    }

    render() {
        const { mood, moodChange } = this.props

        return (
            <div className={ 'moodInput' }>
                <p>My mood today is</p>
                <input type={ 'range' } min={ 1 } max={ 7 } value={ mood }
                       autoComplete={ 'off' } onChange={ moodChange }
                       autoFocus = { true } />
                <div id={ 'face' }> </div>
            </div>
        )
    }

    // Draw bits of face that don't change

    componentDidMount() {

        // Create the SVG on element with id 'face' using svg.min.js loaded in head

        this.draw = SVG('face').size(2*this.size, 2*this.size)

        // Draw face outline

        this.draw.circle(1.8 * this.size)
            .cx(this.size).cy(this.size)
            .fill('yellow')
            .stroke({ width: 5 });

        this.componentDidUpdate({})     // Rest of face
    }

    // (Re)draw bits of face that depend on mood

    shouldComponentUpdate(nextProps) {
        return nextProps.mood != this.props.mood
    }

    componentDidUpdate() {
        const { mood } = this.props         // 1..7
        const happy = parseInt(mood) - 4    // -3 .. +3 for ease of scaling

        // Eyes

        const eyeSep = 0.3 * this.size,
              eyeRadius = 50 + 2*happy,                 // Happier => bigger
              eyeY = 0.8 * this.size - 4*happy;         // Happier => higher
        if (this.eyes) this.eyes.map(e => e.remove())
        this.eyes = [-1, 1].map(leftRight =>
                                this.draw.circle(eyeRadius)
                                    .cx(this.size + leftRight * eyeSep)
                                    .cy(eyeY))
        // Mouth

        const width = 0.8 * this.size + 5*happy,        // Happier => wider
              leftX = this.size - width/2,
              rightX = this.size + width/2,
              cornerY = 1.35 * this.size - 4 * happy,   // Happier => higher corners
              left = `${ leftX },${ cornerY }`,
              right = `${ rightX },${ cornerY }`,

              controlX = this.size,
              controlY = cornerY + 25 * happy,          // Happier => lower in middle
              control = `${ controlX },${ controlY }`;

        if (this.mouth) this.mouth.remove()
        this.mouth = this.draw.path(`M${ left } Q${ control } ${ right }`)
            .stroke({ width: 15, linecap: 'round' })
            .fill('none')
    }
}
