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
      this.setState({loading: false}); // this triggers a re-render!
    }, 3000)
  }
  render() {
    if(this.state.loading){
      return (<h1>Fetching data from the API...</h1>)
    } else {
      return (
      <div>
        <NavBar />
        <MessageList />
        <ChatBar />
      </div>
      )
    }
  }
}
export default App;
