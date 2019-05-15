import React, { Component } from 'react';
import { Button, Typography, Input, message } from 'antd';
import Team from '../models/Team';

class Home extends Component {
    state = {
        name: '',
        found: false,
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
            let newTeam = new Team({ name: this.state.name });
            await newTeam.save();

            this.props.history.push(`/team/${newTeam.id}`);
        }
    };

    handleInput = e => {
        this.state.teams.find(team => team.name === e.target.value)
            ? this.setState({ found: true })
            : this.setState({ found: false });
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
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Input
                        autoFocus
                        placeholder={this.props.teamName}
                        onChange={this.handleInput}
                        style={{ marginRight: '10px' }}
                    />
                    {this.state.found ? (
                        <Button type="primary">View Team</Button>
                    ) : (
                        <Button loading={this.state.loading} type="primary">
                            Create Team
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
