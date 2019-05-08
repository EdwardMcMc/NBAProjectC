import React, { Component } from 'react';
import { Table } from 'antd';
import RemovePlayer from './RemovePlayer';
import PlayerInfo from './PlayerInfo';

class TeamTable extends Component {
    render() {
        return (
            <Table
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
                        key: 'expand',
                        fixed: 'right',
                        width: 100,
                        render: player => <PlayerInfo player={player} />
                    },
                    {
                        title: '',
                        key: 'operation',
                        fixed: 'right',
                        width: 100,
                        render: player => (
                            <RemovePlayer
                                player={player}
                                handleRemove={this.props.handleRemove}
                            />
                        )
                    }
                ]}
                pagination={{
                    pageSize: 15,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`
                }}
                dataSource={this.props.selectedRows}
            />
        );
    }
}

export default TeamTable;
