import React, {Component} from 'react';
import NavBar from './NavBar.jsx'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {loading: true}
  }
  componentDidMount(){
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({
        data: {
          currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [
            {
              username: 'Bob',
              content: 'Has anyone seen my marbles?',
            },
            {
              username: 'Anonymous',
              content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
            }
          ]
        }, 
        loading: false}); // this triggers a re-render!
    }, 3000)
  }
  render() {
    if(this.state.loading){
      return (<h1>Fetching data from the API...</h1>)
    } else {
      return (
      <div>
        <NavBar />
        <MessageList messages={this.state.data.messages}/>
        <ChatBar currentUser={this.state.data.currentUser}/>
      </div>
      )
    }
  }
}
export default App;
