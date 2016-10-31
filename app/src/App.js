var Isomer = require('isomer');

import React, { Component } from 'react';
import areas from './areas.json';
import IsometricGrid from './IsometricGrid';
import AreaSelector from './AreaSelector';
import './App.css';

//let area = areas['60201'];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAreaCode: '60201',
    };
  }

  render() {
    let { selectedAreaCode } = this.state;

    let area = areas[selectedAreaCode];

    return (
      <div className={'App'}>
        <h1 className={'title'}>The Grid</h1>
        <AreaSelector areas={areas}
          currentArea={selectedAreaCode}
          onSelect={this._selectNewArea.bind(this)}
          />
        <IsometricGrid area={area} />
      </div>
    );
  }

  _selectNewArea(areaCode) {
    this.setState({
      selectedAreaCode: areaCode
    });
  }
}

export default App;
