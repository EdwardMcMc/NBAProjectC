import React, { Component, Fragment } from 'react';
import { Tabs, PageHeader, Button, message } from 'antd';
import TeamName from './TeamName';
import AddPlayers from './AddPlayers';
import TeamTable from './TeamTable';
import Fuse from 'fuse.js';
import * as _ from 'lodash';
import Meta from './Meta';

class TeamEditor extends Component {
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
        if (this.state._id !== '') this.loadTeam();
    }

    loadTeam = () => {
        fetch(`/api/team/${this.state._id}`)
            .then(res => res.json())
            .then(json =>
                this.setState({
                    selectedRowKeys: json.keys,
                    name: json.name,
                    selectedRows: json.rows
                })
            );
    };

    getData = () => {
        fetch('/api/players', {
            cache: 'force-cache'
        })
            .then(res => res.json())
            .then(json => this.setState({ data: json }))
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
        fetch('/api/team/save', {
            method: 'POST',
            body: JSON.stringify({
                _id: this.state._id,
                name: this.state.name,
                keys: this.state.selectedRowKeys,
                rows: this.state.selectedRows
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                res.status === 200
                    ? message.success('Successfully saved team')
                    : message.error('Error saving team');
                return res.json();
            })
            .then(json => this.props.history.push(`/team/${json._id}`))
            .then(() => this.setState({ saving: false }));
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
            selectedRowKeys: _.pull(this.state.selectedRowKeys, player.key),
            selectedRows: _.pull(this.state.selectedRows, player)
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
                        <Button
                            onClick={this.save}
                            disabled={this.state.saving}
                            loading={this.state.saving}
                            style={{ margin: '10px' }}
                        >
                            Save
                        </Button>
                        <Button style={{ margin: '10px' }}>Revert</Button>
                    </TabPane>
                </Tabs>
            </Fragment>
        );
    }
}

export default TeamEditor;
