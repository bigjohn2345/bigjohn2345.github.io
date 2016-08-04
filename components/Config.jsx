import React from 'react'
import { connect } from 'react-redux'

class Config extends React.Component {
    onConfigChange() {
      this.props.dispatch({
        type: 'SET_CONFIG',
        key: document.getElementById('txtKey').value 
      })
    }

    hideConfig() {
      this.props.dispatch({
        type: 'HIDE_CONFIG'
      })
    }

    render() {
        let configClass = "config-box " + (this.props.db.showConfig ? "show" : "");
        return (
            <div className={configClass}>
              <label>Kipalog API Key:</label>
              <input id="txtKey" type="text" placeholder="Enter your Kipalog API Key here" onChange={this.onConfigChange.bind(this)} value={this.props.db.key || ''} />
              <button onClick={this.hideConfig.bind(this)} className="btn right">DONE</button>
            </div>
        )
    }
}

export default connect( state => ({ db: state }) )(Config)
