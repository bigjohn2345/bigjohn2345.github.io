import React from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

class Publish extends React.Component {
  submit(mode = 'draft') {
    var self = this;
    request.post('http://kipalog.com/api/v1/post')
      .set('X-Kipalog-Token', self.props.db.key) 
      .send({
        title: document.getElementById('txtTitle').value,
        tag: document.getElementById('txtTags').value,
        status: mode,
        content: self.props.db.note
      })
    .then(function(result) {
      console.log(result);
      self.cancelClick();
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
