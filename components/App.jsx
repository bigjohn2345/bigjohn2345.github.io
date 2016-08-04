import React from 'react'
import { Provider } from 'react-redux'
import DB from './DB'
import Header from './Header'
import Notepad from './Notepad'
import Share from './Share'

class App extends React.Component {
    render() {
        return (
            <Provider store={DB}>
            <div className="container">
                <Header title="Noteit" />
                <Notepad />
                <Share />
            </div>
            </Provider>
        )
    }
}

export default App
