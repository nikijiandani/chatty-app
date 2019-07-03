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
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.data.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ data: { ...this.state.data, messages: messages } })
    }, 3000);
  }

  onSendMessage = (messageContent) => {
    const newMessage = {
      id: generateRandomId(), 
      username: this.state.data.currentUser.name, 
      content: messageContent
    }
    const messages = this.state.data.messages.concat(newMessage)
    this.setState({ data: { ...this.state.data, messages: messages }})
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
