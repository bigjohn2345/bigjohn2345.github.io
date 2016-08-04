import React from 'react'
import { connect } from 'react-redux'

class Share extends React.Component {
    onShareClick() {
      this.props.dispatch({ 
        type: 'SHOW_SHARE'
      });
    }

    render() {
        return (
            <button onClick={this.onShareClick.bind(this)} className="share">
              <span className="entypo-paper-plane"></span>
            </button>
        )
    }
}

export default connect( state => ({ db: state }) )(Share)
