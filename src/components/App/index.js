import React from 'react'
import { Route } from 'react-router-dom'

import InputForm from '../InputForm'
import Insights from '../Insights'

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Route path="/" exact   component={ InputForm } />
                <Route path="/insights" component={ Insights } />
            </div>
        )
    }
}
