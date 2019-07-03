import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      return <Message key={this.props.messages.indexOf(message)} messageUser={message.username} messageText={message.content} />;
    });
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}
export default MessageList;