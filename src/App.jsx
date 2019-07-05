import React, {Component} from 'react';
import NavBar from './NavBar.jsx'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        onlineUsers: 1,
        currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
      }
    }
  }

  componentDidMount(){
    console.log('componentDidMount <App />');
    //create a WebSocket
    this.socket = new WebSocket('ws://localhost:3001')
    console.log('Connected to Server!!!')
    this.socket.onmessage = this.gotMsg;
    this.socket.onclose = this.closed;
    this.socket.onopen = () => {
      //send msg to server that user has joined
      const userJoined = {
        type: 'postUserJoined',
        content: `A new user ${this.state.data.currentUser.name} has joined the chat`
      }
      this.socket.send(JSON.stringify(userJoined))
      this.setState({closed: false});
    };
  }

  closed = () => {
    this.setState({closed: true});
  }

  gotMsg = (msg) => {
    // handle incoming msg
    const myIncomingMessage = JSON.parse(msg.data)
    console.log("Incoming from WS", myIncomingMessage)

    switch(myIncomingMessage.type) {
      case "incomingMessage":
      case "incomingNotification":
        //handle incoming message
        this.setState({ 
          data: {
            ...this.state.data,
            messages: [...this.state.data.messages, myIncomingMessage]
          }
         });
        break;
      case "incomingUserCount":
        //handle incoming user count
        this.setState({
          data: {
            ...this.state.data,
            onlineUsers: myIncomingMessage.numberOfUsers,
          }
        });
        break;
      default:
      //show an error in the console if the msg type is unknown
      console.log("Unknown message type: ", msg.type);
    }
  }

  onSendMessage = (msg) => {
    const messageObj = {
      type: "postMessage",
      username: this.state.data.currentUser.name,
      content: msg
    }
    this.socket.send(JSON.stringify(messageObj)); 
  }

  onUpdateUser = (usr) => {
    console.log(usr)
    const tempState = {...this.state.data}
    const postNotification = {
      type: "postNotification",
      content: `User ${tempState.currentUser.name} has changed their name to ${usr}`
    }
    tempState.currentUser.name = usr
    console.log(tempState)
    console.log(postNotification)
    this.setState({ tempState })
    this.socket.send(JSON.stringify(postNotification))
  }

  render() {
    return (
    <div>
      <NavBar users={this.state.data.onlineUsers}/>
      <MessageList messages={this.state.data.messages}/>
      <ChatBar currentUser={this.state.data.currentUser} onSendMessage={this.onSendMessage} onUpdateUser={this.onUpdateUser}/>
    </div>
    )
  }
}
export default App;
