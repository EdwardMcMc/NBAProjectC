import React, { Component } from 'react';
import { Button, Typography, Input, message } from 'antd';
import Team from '../models/Team';

class Home extends Component {
    state = {
        name: ''
    };

    handleOk = async () => {
        if (this.state.name === '') message.error('Please enter a team name');
        else {
            this.setState({
                visible: false
            });

            let newTeam = new Team({ name: this.state.name });
            await newTeam.save();

            this.props.history.push(`/team/${newTeam.id}`);
        }
    };

    handleInput = e => {
        this.setState({ name: e.target.value });
    };

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography.Title>R.P.S.</Typography.Title>
                <div>
                    <Input
                        autoFocus
                        size="large"
                        placeholder={this.props.teamName}
                        onChange={this.handleInput}
                        onKeyPress={e => {
                            if (e.charCode === 13) this.handleOk();
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Home;
