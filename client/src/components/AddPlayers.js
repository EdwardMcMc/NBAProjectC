import React, { Component } from 'react';
import Search from './Search';
import { Table } from 'antd';
import * as _ from 'lodash';
import PlayerInfo from './PlayerInfo';

class AddPlayers extends Component {
    render() {
        const rowSelection = {
            selectedRowKeys: this.props.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.onSelect(selectedRowKeys, selectedRows);
            },
            getCheckboxProps: player => ({
                disabled:
                    this.props.selectedRowKeys.length >= 15 &&
                    _.indexOf(this.props.selectedRows, player) === -1
            })
        };
        return (
            <div style={{ textAlign: 'right' }}>
                <Search
                    handleSearch={this.props.handleSearch}
                    search={this.props.search}
                />
                <Table
                    bordered
                    rowSelection={rowSelection}
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'Player',
                            sorter: (a, b) => {
                                let nameA = a.Player.toLowerCase(),
                                    nameB = b.Player.toLowerCase();
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            },
                            sortDirections: ['ascend', 'descend']
                        },
                        {
                            title: 'Team',
                            dataIndex: 'Tm',
                            sorter: (a, b) => {
                                let TmA = a.Tm.toLowerCase(),
                                    TmB = b.Tm.toLowerCase();
                                if (TmA < TmB) return -1;
                                if (TmA > TmB) return 1;
                                return 0;
                            },
                            sortDirections: ['ascend', 'descend']
                        },
                        {
                            title: 'Position',
                            dataIndex: 'Pos',
                            sorter: (a, b) => {
                                let PosA = a.Pos.toLowerCase(),
                                    PosB = b.Pos.toLowerCase();
                                if (PosA < PosB) return -1;
                                if (PosA > PosB) return 1;
                                return 0;
                            },
                            sortDirections: ['ascend', 'descend']
                        },
                        {
                            title: 'Age',
                            dataIndex: 'Age',
                            sorter: (a, b) => a.Age - b.Age,
                            sortDirections: ['ascend', 'descend']
                        },
                        {
                            title: 'Points',
                            dataIndex: 'PTS',
                            sorter: (a, b) => a.PTS - b.PTS,
                            sortDirections: ['ascend', 'descend']
                        },
                        {
                            title: '',
                            key: 'operation',
                            fixed: 'right',
                            width: 100,
                            render: player => <PlayerInfo player={player} />
                        }
                    ]}
                    dataSource={this.props.data}
                    loading={this.props.loading}
                    pagination={{
                        pageSize: 15,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                        current: this.props.page,
                        onChange: this.props.pageChange
                    }}
                    rowKey={'key'}
                />
            </div>
        );
    }
}

export default AddPlayers;
