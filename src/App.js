import data from './data';
import React, { Component } from 'react';
import TheRose from './TheRose';

class App extends Component {
    render() {
        return <TheRose teams={data.teams} />;
    }
}

export default App;
