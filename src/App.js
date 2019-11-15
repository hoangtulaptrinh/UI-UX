import React from 'react';
import './App.css';
import ListRoom from './components/ListRoom'
import ContentRoom from './components/ContentRoom'
import InfoRoom from './components/InfoRoom'

function App() {
  return (
    <div className="App">
      <ListRoom />
      <ContentRoom />
      <InfoRoom />
    </div>
  );
}

export default App;
