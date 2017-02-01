import React, { Component } from 'react';
import './App.css';
import './main.css';
import StreamHeaderContainer from './StreamHeaderContainer';
import StreamDisplay from './StreamDisplay';
import FilterBar from './FilterBar';

class App extends Component {
  render() {
    return (
      <div className="MainContainer">
        <StreamHeaderContainer />
        <FilterBar />
        <StreamDisplay />
      </div>
    );
  }
}

export default App;