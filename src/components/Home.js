import React, { Component } from 'react';
import { Button, Typography, Input, message } from 'antd';
import Team from '../models/Team';

class Home extends Component {
    state = {
        name: '',
        found: false,
        id: null,
        teams: [],
        loading: true
    };

    componentDidMount() {
        Team.getAll().then(teams => {
            this.setState({ teams, loading: false });
        });
    }

    handleOk = async () => {
        if (this.state.name === '') message.error('Please enter a team name');
        else {
            if (this.state.id != null) {
                this.props.history.push(`/team/${this.state.id}`);
            } else {
                let newTeam = new Team({ name: this.state.name });
                await newTeam.save();
                this.props.history.push(`/team/${newTeam.id}`);
            }
        }
    };

    handleInput = e => {
        // a-z 0-9, _ and spaces);
        let reg = new RegExp(/^[\w\d\ ]+$/g);

        if (reg.test(e.target.value) || e.target.value === '') {
            if (
                !this.state.teams.find(team => {
                    if (
                        team.name.toLowerCase() === e.target.value.toLowerCase()
                    ) {
                        this.setState({ id: team.id });
                        return true;
                    }
                })
            ) {
                this.setState({ id: null });
            }
            this.setState({ name: e.target.value });
        }
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
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Input
                        autoFocus
                        placeholder={this.props.teamName}
                        onChange={this.handleInput}
                        style={{ marginRight: '10px' }}
                        value={this.state.name}
                    />
                    {this.state.id != null ? (
                        <Button onClick={this.handleOk} type="primary">
                            View Team
                        </Button>
                    ) : (
                        <Button
                            onClick={this.handleOk}
                            disabled={this.state.loading}
                            type="primary"
                        >
                            Create Team
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
