import React, { Component, Fragment } from 'react';
import { Modal, Popconfirm } from 'antd';

class PlayerInfo extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => {
        this.setState({
            visible: false
        });
    };

    renderStats = () => {
        let data = [];
        let i = 0;
        for (let key in this.props.player) {
            data.push(
                <p key={i++} style={{ margin: '0px' }}>
                    <b>{key}: </b>
                    {this.props.player[key]}
                </p>
            );
        }
        return data;
    };

    render() {
        return (
            <Fragment>
                <Popconfirm title="" visible={false}>
                    <a
                        onClick={this.showModal}
                        href="/"
                        style={{ textDecoration: 'none' }}
                    >
                        Expand
                    </a>
                </Popconfirm>
                <Modal
                    title="Player statistics"
                    okText="Close"
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                    visible={this.state.visible}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    destroyOnClose={true}
                >
                    {this.renderStats()}
                </Modal>
            </Fragment>
        );
    }
}

export default PlayerInfo;
