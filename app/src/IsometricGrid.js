var Isomer = require('isomer');

import React, { Component, PropTypes } from 'react';

import Colors from './Colors';

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

    let { Color, Point, Shape } = Isomer;

    let { area } = this.props;

    var count = 0;

    area['matrix'].forEach(function(row, row_index) {
      row.forEach(function(tile, tile_index) {
        if (tile === 1) {
          //var color = white;

          let color;
          // Classification function
          if (count < area.blueTiles) {
            color = new Color(...Colors.BLUE);
          } else if (count < (area.blueTiles + area.redTiles)) {
            color = new Color(...Colors.RED);
          } else if (count < (area.blueTiles + area.redTiles + area.yellowTiles)) {
            color = new Color(...Colors.YELLOW);
          } else if (count < (area.blueTiles + area.redTiles + area.yellowTiles + area.brownTiles)) {
            color = new Color(...Colors.BROWN);
          } else if (count < (area.blueTiles + area.redTiles + area.yellowTiles + area.brownTiles + area.greenTiles)) {
            color = new Color(...Colors.GREEN);
          } else {
            color = new Color(...Colors.WHITE);
          }

          count++;

          // I occasionally get one too many
          if (count <= area.tileCount) {
            // Add the shape to be rendered
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
