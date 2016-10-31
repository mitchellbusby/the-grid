var Isomer = require('isomer');

import React, { Component } from 'react';
import areas from './areas.json';
import IsometricGrid from './IsometricGrid';
import './App.css';

let area = areas['60201'];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <IsometricGrid area={area} />
      </div>
    );
  }
}

export default App;
