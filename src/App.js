import React from 'react';
import Header from './components/Header';
import './App.css';
import ChatBox from './components/ChatBox';

function App() {
    return (
        <div className="app-container">
            <Header />
            <ChatBox />
        </div>
    );
}

export default App;
