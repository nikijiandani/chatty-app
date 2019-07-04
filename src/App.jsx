import React, {Component} from 'react';
import NavBar from './NavBar.jsx'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
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
      this.setState({closed: false});
    };
  }  

  closed = () => {
    this.setState({closed: true});
  }

  gotMsg = (msg) => {
    // handle incoming msg
    const myIncomingMessage = JSON.parse(msg.data)
    const messages = this.state.data.messages.concat(myIncomingMessage)
    this.setState({ data: { ...this.state.data, messages } });
  }

  onSendMessage = (msg) => {
    const messageObj = {
      username: this.state.data.currentUser.name,
      content: msg
    }
    this.socket.send(JSON.stringify(messageObj)); 
  }

  onUpdateUser = (usr) => {
    console.log(usr)
    const tempState = {...this.state.data}
    tempState.currentUser.name = usr
    console.log(tempState)
    this.setState({ tempState })
  }

  render() {
    return (
    <div>
      <NavBar />
      <MessageList messages={this.state.data.messages}/>
      <ChatBar currentUser={this.state.data.currentUser} onSendMessage={this.onSendMessage} onUpdateUser={this.onUpdateUser}/>
    </div>
    )
  }
}
export default App;
