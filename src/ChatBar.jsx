import React, {Component} from 'react';

class ChatBar extends Component {

  onUsernameChange = (e) => {
      this.props.onUpdateUser(e.target.value)
  }

  onMessageChange = (e) => {
    if(e.key === 'Enter') {
      this.props.onSendMessage(e.target.value)
      e.target.value = ""
    }
  }


  render() {
    return (
      <footer className="chatbar">
        <input 
        className="chatbar-username" 
        onBlur={this.onUsernameChange}
        defaultValue={this.props.currentUser.name} 
        placeholder="Your Name (Optional)" 
        />
        <input 
        className="chatbar-message"
        onKeyPress={this.onMessageChange}
        placeholder="Type a message and hit ENTER" 
        />
      </footer>
    );
  }
}
export default ChatBar;
