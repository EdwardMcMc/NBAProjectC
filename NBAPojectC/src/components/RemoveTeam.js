import React, { Component } from 'react';
import { Popconfirm } from 'antd';

class RemoveTeam extends Component {
    render() {
        return (
            <Popconfirm
                title="Delete this team?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => this.props.handleRemove(this.props.team)}
            >
                <a href="/">Delete</a>
            </Popconfirm>
        );
    }
}

export default RemoveTeam;
