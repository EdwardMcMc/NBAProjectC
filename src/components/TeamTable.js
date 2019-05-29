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
                        dataIndex: 'Player'
                    },
                    {
                        title: 'Min',
                        dataIndex: 'MIN'
                    },
                    {
                        title: 'FGA',
                        dataIndex: 'FGA'
                    },
                    {
                        title: 'FG3A',
                        dataIndex: 'FG3A'
                    },
                    {
                        title: 'OREB',
                        dataIndex: 'OREB'
                    },
                    {
                        title: 'DREB',
                        dataIndex: 'AST'
                    },
                    {
                        title: 'TOV',
                        dataIndex: 'TOV'
                    },
                    {
                        title: 'STL',
                        dataIndex: 'STL'
                    },
                    {
                        title: 'BLK',
                        dataIndex: 'BLK'
                    },
                    {
                        title: 'PF',
                        dataIndex: 'PF'
                    },
                    {
                        title: 'PTS',
                        dataIndex: 'PF'
                    },
                    {
                        title: 'FTA',
                        dataIndex: 'FTA'
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
                    hideOnSinglePage: true,
                    pageSize: 15
                    // showTotal: (total, range) =>
                    //     `${range[0]}-${range[1]} of ${total} items`
                }}
                dataSource={this.props.selectedRows}
            />
        );
    }
}

export default TeamTable;
