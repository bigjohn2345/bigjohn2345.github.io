import React from 'react'
import { connect } from 'react-redux'

class Publish extends React.Component {
  showError() {
    var self = this;
    self.cancelClick();
    self.props.dispatch({ 
      type: 'SHOW_MSG',
      msg: 'Sorry! There are some unknown error! Can\'t submit your post right now. But I bet it\'s not my bug! You better check it yourself!'
    });
  }

  draftClick() {
    this.submit();
  }

  publishClick() {
    this.submit('published');
  }

  cancelClick() {
    this.props.dispatch({
      type: 'HIDE_SHARE'
    });
  }

  submit(mode = 'draft') {
    var self = this;
    fetch("http://kipalog.com/api/v1/post", {
      method: "POST",
      body: JSON.stringify({
        title: document.getElementById('txtTitle').value,
        tag: document.getElementById('txtTags').value,
        status: mode,
        content: self.props.db.note
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Kipalog-Token": self.props.db.key,
        "Access-Control-Request-Headers": "*",
        "Access-Control-Allow-Origin": "*"
      },
      mode: "cors"
    }).then(function(data) { 
      if (data.status != 200) {
        self.showError();
      } else {
        self.cancelClick();
      }
    }).catch(function(err) { 
      self.showError();
    });
  }

  render() {
    let publishClass = "publish-box " + (this.props.db.showPublish ? "show" : "");
    return (
        <div className={publishClass}>
        <label>Title:</label>
        <input id="txtTitle" type="text" placeholder="Enter your post title" />
        <label>Tags:</label>
        <input id="txtTags" type="text" placeholder="Example: til, golang,..." />
        <button onClick={this.cancelClick.bind(this)} className="btn red">CANCEL</button>
        <button onClick={this.draftClick.bind(this)} className="btn right">DRAFT</button>
        <button onClick={this.publishClick.bind(this)} className="btn right">PUBLISH</button>
        </div>
        )
  }
}

export default connect( state => ({ db: state }) )(Publish)
