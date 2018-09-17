import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from "../actions/index";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    // State here is completely different with app state
    // Here is component level state, different with app level state.
    this.state = {term: ''};
    // If pass a callback function like 'onChange = this.onInputChange', and a callback has a reference to this
    // we need to bond the context.
    // Otherwise, 'this' in callback function will not represent current class (SearchBar in this case)
    // Or we can do it with fat arrow function
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  // All event handler: onInputChange, onClick, onHover, all of them have a event object as argument
  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    // We need to fetch data here
    this.props.fetchWeather(this.state.term);
    this.setState({term: ''});

  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className='input-group'>
        <input
          placeholder='Get a five-day forecast in your favorite cities'
          className='form-control'
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className='input-group-btn'>
          <button type='submit' className='btn btn-secondary'>Submit</button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchWeather}, dispatch);
}

// Function always passed as second argument, and first argument is state
// However, in this case, this component dose not care about state at all, thus pass null instead
export default connect(null, mapDispatchToProps)(SearchBar);