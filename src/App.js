import './App.css';
import data from './data';
import React, { Component } from 'react';
import TheRose from './TheRose';

class App extends Component {
    render() {
        const teams = data.teams;

        return (
            <div className="App">
                <TheRose teams={teams} />
            </div>
        );
    }
}

export default App;
