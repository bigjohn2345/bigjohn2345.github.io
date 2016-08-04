import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Notepad from './Notepad'
import Share from './Share'
import Config from './Config'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Header title="Noteit" />
                <Notepad />
                <Share />
                <Config />
            </div>
        )
    }
}

export default connect( state => ({ db: state }) )(App)
