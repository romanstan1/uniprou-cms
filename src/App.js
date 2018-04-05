import React, { Component } from 'react';
import * as firebase from 'firebase';

class App extends Component {

  state = {value: ''}

  submitJson = () => {
    const dbRef = firebase.database().ref()
    const categories = JSON.parse(this.state.value)
    dbRef.set(categories)
    console.log("Must've worked!")
  }

  handleTextInput = (e) => {
    const value = e.target.value
    this.setState({value})
  }

  render() {
    return (
      <div className="App">
        <h3>Use with the utmost care!</h3>
        <h4>That had better be valid json...</h4>
        <div>
          <textarea onChange={this.handleTextInput} value={this.state.value} rows="15" cols="50">
          </textarea>
        </div>
        <div className='SubmitButton' onClick={this.submitJson}>
          Submit</div>
      </div>
    );
  }
}

export default App;
