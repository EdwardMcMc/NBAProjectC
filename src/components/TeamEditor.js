import React, { Component, Fragment } from 'react';
import { Tabs, PageHeader, Button, message } from 'antd';
import TeamName from './TeamName';
import AddPlayers from './AddPlayers';
import TeamTable from './TeamTable';
import Fuse from 'fuse.js';
import * as _ from 'lodash';
import Meta from './Meta';

import Team from '../models/Team';
import Player from '../models/Player';

class TeamEditor extends Component {
    team = null;
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.match.params.id || '',
            name: this.props.match.params.name || '',
            selectedRowKeys: [],
            selectedRows: [],
            data: [],
            fuse: null,
            loading: true,
            search: '',
            page: 1,
            saving: false
        };
    }

    componentDidMount() {
        this.getData();
        this.loadTeam();
    }

    componentDidUpdate(props, state) {
        if (
            this.state.name !== state.name ||
            this.state.selectedRowKeys !== state.selectedRowKeys ||
            this.state.selectedRows !== state.selectedRows
        )
            this.save();
    }

    loadTeam = () => {
        Team.getWithPlayers(this.state._id).then(team => {
            this.team = team;
            this.setState({
                selectedRowKeys: team.keys,
                name: team.name,
                selectedRows: team.rows
            });
        });
    };

    getData = () => {
        Player.getAll()
            .then(data => this.setState({ data }))
            .then(() => {
                this.setState({
                    fuse: new Fuse(this.state.data, {
                        keys: ['Player']
                    }),
                    loading: false
                });
            });
    };

    predict = () => {
        fetch('/api/predict', {
            method: 'POST',
            body: JSON.stringify(this.state.selectedRows),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => console.log(json));
    };

    save = () => {
        this.setState({ saving: true });
        // Update the team object
        this.team.name = this.state.name;
        this.team.rows = this.state.selectedRows;
        this.team.keys = this.state.selectedRowKeys;
        // Save the changes
        this.team
            .save()
            .then(() => {
                this.props.history.push(`/team/${this.team.id}`);
                this.setState({ saving: false });
            })
            .catch(err => {
                this.setState({ saving: false });
                message.error(`Error: ${err.message}`);
            });
    };

    handleSearch = e => {
        e.target.value === ''
            ? this.setState({ data: this.state.fuse.list, search: '' })
            : this.setState({
                  data: this.state.fuse.search(e.target.value),
                  page: 1,
                  search: e.target.value
              });
    };

    onSelect = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    };

    onTabChange = () => {
        this.handleSearch({ target: { value: '' } });
    };

    handleRemove = player => {
        this.setState({
            selectedRowKeys: _.without(this.state.selectedRowKeys, player.key),
            selectedRows: _.without(this.state.selectedRows, player)
        });
    };

    updateName = name => {
        this.setState({ name });
    };

    pageChange = e => {
        this.setState({ page: e });
    };

    render() {
        let TabPane = Tabs.TabPane;
        return (
            <Fragment>
                <PageHeader
                    style={{ textAlign: 'left' }}
                    onBack={() => {
                        this.props.history.push('/');
                    }}
                    title="Team Editor"
                    subTitle="create or modify an existing team"
                />
                <TeamName
                    updateName={this.updateName}
                    teamName={this.state.name}
                    loading={this.state.loading}
                />
                <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                    <TabPane tab="Add Players" key="1">
                        <Meta length={this.state.selectedRowKeys.length} />
                        <AddPlayers
                            loading={this.state.loading}
                            data={this.state.data}
                            onSelect={this.onSelect}
                            selectedRowKeys={this.state.selectedRowKeys}
                            selectedRows={this.state.selectedRows}
                            handleSearch={this.handleSearch}
                            search={this.state.search}
                            page={this.state.page}
                            pageChange={this.pageChange}
                        />
                    </TabPane>
                    <TabPane tab="View Team" key="2">
                        <TeamTable
                            selectedRows={this.state.selectedRows}
                            handleRemove={this.handleRemove}
                        />
                        <Button
                            disabled={this.state.selectedRows.length < 3}
                            type="primary"
                            onClick={this.predict}
                            style={{ margin: '10px' }}
                        >
                            Predict
                        </Button>
                    </TabPane>
                </Tabs>
            </Fragment>
        );
    }
}

export default TeamEditor;
