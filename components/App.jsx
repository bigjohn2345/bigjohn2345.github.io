import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Notepad from './Notepad'
import Share from './Share'
import Config from './Config'
import Publish from './Publish'
import Message from './Message'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Header title="Noteit" />
                <Notepad />
                <Share />
                <Config />
                <Publish />
                <Message />
            </div>
        )
    }
}

export default connect( state => ({ db: state }) )(App)
