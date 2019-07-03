import React, {Component} from 'react';
import NavBar from './NavBar.jsx'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

//generates random key
const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: 1,
            username: 'Bob',
            content: 'Has anyone seen my marbles?',
          },
          {
            id: 2,
            username: 'Anonymous',
            content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
          }
        ]
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
    // handle msg
    console.log(msg)
    const newMessage = {id: generateRandomId(), username: msg.username, content: msg.content}
    const messages = this.state.data.messages.concat(newMessage)
    this.setState({ data: { ...this.state.data, messages: messages } });
  }

  onSendMessage = (msg) => {
    const messageObj = {
      username: this.state.data.currentUser.name,
      content: msg
    }
    this.socket.send(JSON.stringify(messageObj)); 
  }

  render() {
    return (
    <div>
      <NavBar />
      <MessageList messages={this.state.data.messages}/>
      <ChatBar currentUser={this.state.data.currentUser} onSendMessage={this.onSendMessage}/>
    </div>
    )
  }
}
export default App;
