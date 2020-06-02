import React from 'react';
import {Router} from '@reach/router';
import './App.css';
import Start from './components/Start';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <h1>MERN Chat</h1>
        <Chat/>
 
    </div>
  );
}

export default App;
