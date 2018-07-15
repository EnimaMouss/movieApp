import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      placeHolder: "Tapez votre film...",
      intervalBeforRequest: 1200,
      lockRequest: false,
      errorShow: false
    };
  }
  render() {
    return (
      <div>
      <div className="row">
        <div className="col-md-8 input-group">
          <input
            type="text"
            className="form-control input-lg"
            onChange={this.handleChange.bind(this)}
            placeholder={this.state.placeHolder}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-secondary"
              onClick={this.search.bind(this)}
            >
              Go
            </button>
          </span>
        </div>
      </div>
      </div>
    );
  }
  handleChange(event) {
    this.setState({ searchText: event.target.value });
    if (!this.state.lockRequest) {
      this.setState({ lockRequest: true });
      setTimeout(
        function() {
          this.search();
        }.bind(this),
        this.state.intervalBeforRequest
      );
    }
  }

  handleOnClick(event) {
    this.search();
  }
  search() {
    this.props.callback(this.state.searchText);
    this.setState({ lockRequest: false });
  }
}

export default SearchBar;
