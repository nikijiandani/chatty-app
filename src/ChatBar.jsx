import React, {Component} from 'react';

class ChatBar extends Component {

  // onUsernameChange = (e) => {
  //   if (e.input=== 13) {
  //     // enter
  //     this.prop.onSendMessage(this.state.username, this.state.message)
  //   } else {
  //     this.setState({
  //       username: e.input.val()
  //     })
  //   }
  // }

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
        onKeyPress={this.onUsernameChange}
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
