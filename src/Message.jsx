import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
        <div className="message">
          <span className="message-username">{this.props.messageUser}</span>
          <span className="message-content">{this.props.messageText}</span>
        </div>
    );
  }
}
export default Message;