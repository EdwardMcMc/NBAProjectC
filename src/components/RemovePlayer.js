import React, { Component } from 'react';
import { Popconfirm } from 'antd';

class RemovePlayer extends Component {
    render() {
        return (
            <Popconfirm
                title="Remove player from team?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => this.props.handleRemove(this.props.player)}
            >
                <a href="/">Remove</a>
            </Popconfirm>
        );
    }
}

export default RemovePlayer;
