import React from 'react'
import { connect } from 'react-redux'

class Header extends React.Component {
    showConfig() {
      this.props.dispatch({ 
        type: 'SHOW_CONFIG'
      })
    }

    render() {
        return (
            <div className="header">
                <button onClick={this.showConfig.bind(this)} className="btn menu"><span className="entypo-menu"></span></button>
            </div>
        )
    }
}

export default connect( state => ({ db: state }) )(Header)
