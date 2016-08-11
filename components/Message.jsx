import React from 'react'
import { connect } from 'react-redux'

class Message extends React.Component {
    hideMessage() {
      this.props.dispatch({
        type: 'HIDE_MSG'
      })
    }

    render() {
        let messageClass = "message-box " + (this.props.db.message.length ? "show" : "") + (this.props.db.info ? "info" : "");
        return (
            <div className={messageClass}>
              <p>{this.props.db.message}</p>
              <button onClick={this.hideMessage.bind(this)} className="btn right">OKAY</button>
            </div>
        )
    }
}

export default connect( state => ({ db: state }) )(Message)
