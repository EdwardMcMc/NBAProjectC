import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import TeamEditor from './components/TeamEditor';
import Home from './components/Home';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Route path="/" exact component={Home} />
                    <Route path="/create/:name" component={TeamEditor} />
                    <Route path="/team/:id" component={TeamEditor} />
                </Router>
            </div>
        );
    }
}

export default App;
