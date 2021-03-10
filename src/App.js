import React, {Component} from 'react'
import './App.css';
import QuizBee from './components/quizbee';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }

  render() {
    return(
      <div>
        <QuizBee />
        
      </div>
    );
  }
}

export default App;
