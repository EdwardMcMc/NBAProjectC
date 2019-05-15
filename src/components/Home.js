import React, { Component } from 'react';
import { Button, Typography, Modal, Input, message, Icon } from 'antd';
import LoadTeam from './LoadTeam';
import Team from '../models/Team';

class Home extends Component {
    state = {
        visible: false,
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

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    handleInput = e => {
        this.setState({ name: e.target.value });
    };

    showModal() {
        this.setState({ visible: true });
    }

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
                <Typography.Title>JJENK Predictions</Typography.Title>
                <div>
                    <Button
                        onClick={() => this.showModal()}
                        type="primary"
                        style={{ margin: '10px', width: '120px' }}
                    >
                        <Icon type="plus" />
                        Create
                    </Button>
                    <Modal
                        title="Enter team name"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        destroyOnClose={true}
                    >
                        <Input
                            autoFocus
                            size="large"
                            placeholder={this.props.teamName}
                            onChange={this.handleInput}
                            onKeyPress={e => {
                                if (e.charCode === 13) this.handleOk();
                            }}
                        />
                    </Modal>
                    <LoadTeam />
                </div>
            </div>
        );
    }
}

export default Home;
