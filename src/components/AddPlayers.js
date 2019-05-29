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
