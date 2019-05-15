import React, { Component, Fragment } from 'react';
import { Modal, Button, Icon, Table } from 'antd';
import Search from './Search';
import RemoveTeam from './RemoveTeam';
import * as _ from 'lodash';

import Team from '../models/Team';

class LoadTeam extends Component {
    state = {
        teams: [],
        visible: false,
        search: ''
    };

    handleOk = () => {
        this.setState({ visible: false });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    componentDidMount() {
        this.getTeams();
    }

    getTeams = () => {
        Team.getAll().then(teams => this.setState({teams}));
    };

    handleSearch = e => {
        this.setState({ search: e.target.value });
    };

    handleRemove = team => {
        team.delete();
        this.setState({ teams: _.without(this.state.teams, team) });
    };

    render() {
        return (
            <Fragment>
                <Modal
                    title="Load team"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <Search
                        search={this.state.search}
                        handleSearch={this.handleSearch}
                    />
                    <Table
                        dataSource={this.state.teams}
                        columns={[
                            {
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name'
                            },
                            {
                                title: '',
                                key: 'load',
                                fixed: 'right',
                                width: 100,
                                render: team => {
                                    return (
                                        <a href={`/team/${team.id}`}>Load</a>
                                    );
                                }
                            },
                            {
                                title: '',
                                key: 'delete',
                                fixed: 'right',
                                width: 100,
                                render: team => {
                                    return (
                                        <RemoveTeam
                                            team={team}
                                            handleRemove={this.handleRemove}
                                        >
                                            Load
                                        </RemoveTeam>
                                    );
                                }
                            }
                        ]}
                        rowKey={'_id'}
                        bordered
                        pagination={{ pageSize: 5 }}
                    />
                </Modal>
                <Button
                    onClick={this.showModal}
                    style={{ margin: '10px', width: '120px' }}
                >
                    <Icon type="download" />
                    Load
                </Button>
            </Fragment>
        );
    }
}

export default LoadTeam;
