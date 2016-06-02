import React from 'react'
import Header from './Header'
import Notepad from './Notepad'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Header title="Noteit" />
                <Notepad />
            </div>
        )
    }
}

export default App
