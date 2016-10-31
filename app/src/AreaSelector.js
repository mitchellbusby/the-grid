import React, { Component, PropTypes } from 'react';

class AreaSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {

    let { areas, currentArea } = this.props;

    return (
      <select onChange={this.handleChange.bind(this)} defaultValue={currentArea}>
      { Object.keys(areas).map(key => {
        let area = areas[key];
        return (
            <option key={key} value={area.code}>{area.name}</option>
        )
      }) }
      </select>
    );
  }

  handleChange(event) {
    let { onSelect } = this.props;
    let selectedAreaCode = event.target.value;
    if (onSelect) {
      onSelect(selectedAreaCode);
    }
  }

}

AreaSelector.propTypes = {
  areas: PropTypes.object.isRequired,
  currentArea: PropTypes.string,
  onSelect: PropTypes.func,
}

export default AreaSelector;
