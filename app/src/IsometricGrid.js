var Isomer = require('isomer');

import React, { Component, PropTypes } from 'react';

class IsometricGrid extends Component {
  render () {
    return (
      <div className={"isometricGrid"}>
        <canvas ref={(c) => this._canvas = c} />
      </div>
    );
  }

  componentDidMount() {

    let { width, height} = this.props;

    this._canvas.style.width = width + 'px';
    this._canvas.style.height = height + 'px';

    // 2x for retina displays
    this._canvas.width = 2 * width;
    this._canvas.height = 2 * height;

    var iso = new Isomer(this._canvas);

    var Point  = Isomer.Point;
    var Path   = Isomer.Path;
    var Shape  = Isomer.Shape;
    var Vector = Isomer.Vector;
    var Color  = Isomer.Color;

    var red = new Color(160, 60, 50);
    var blue = new Color(50, 60, 160);
    var yellow = new Color(205, 211, 31);
    var brown = new Color(0, 0, 0); // actually black
    var green = new Color(63, 160, 50);

    var white = new Color(255, 255, 255);

    let { area } = this.props;

    var count = 0;
    area['matrix'].forEach(function(row, row_index) {
      row.forEach(function(tile, tile_index) {
        if (tile === 1) {
          var color = white;

          if (count < area.blueTiles) {
            color = blue;
          } else if (count < (area.blueTiles + area.redTiles)) {
            color = red;
          } else if (count < (area.blueTiles + area.redTiles + area.yellowTiles)) {
            color = yellow;
          } else if (count < (area.blueTiles + area.redTiles + area.yellowTiles + area.brownTiles)) {
            color = brown;
          } else if (count < (area.blueTiles + area.redTiles + area.yellowTiles + area.brownTiles + area.greenTiles)) {
            color = green;
          }

          count++;

          // I occasionally get one too many
          if (count <= area.tileCount) {
            iso.add(Shape.Prism(new Point(row_index, tile_index, 0), 1, 1, 0.08), color);
          }
        }
      });
    });
  }
}

IsometricGrid.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  area: PropTypes.object.isRequired,
}

IsometricGrid.defaultProps = {
  width: 600,
  height: 600
};

export default IsometricGrid;
