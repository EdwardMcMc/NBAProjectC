import React, { Component, Fragment } from 'react';
import { Icon, Typography, Modal, Tooltip, Input } from 'antd';

class TeamName extends Component {
    state = {
        visible: false,
        newTeamName: null
    };

    handleOk = () => {
        this.props.updateName(this.state.newTeamName);
        this.setState({
            visible: false,
            newTeamName: null
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    handleInput = e => {
        let reg = new RegExp(/^[\w\d\ ]+$/g);
        if (reg.test(e.target.value)) {
            this.setState({ newTeamName: e.target.value });
        }
    };

    showModal() {
        this.setState({ visible: true });
    }

    render() {
        return (
            <Fragment>
                <Typography.Title style={{ textAlign: 'center' }}>
                    {this.props.teamName}
                    <Tooltip placement="top" title="Edit team name">
                        <Icon
                            className="editIcon"
                            style={{ marginLeft: '5px', fontSize: '14px' }}
                            type="edit"
                            onClick={() => this.showModal()}
                        />
                    </Tooltip>
                </Typography.Title>
                <Modal
                    title="Edit team name"
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
                        value={this.state.newTeamName}
                    />
                </Modal>
            </Fragment>
        );
    }
}

export default TeamName;
