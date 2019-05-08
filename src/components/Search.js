import React, { Component } from 'react';
import { Input } from 'antd';

class Search extends Component {
    render() {
        return (
            <Input.Search
                style={{ width: '200px', marginBottom: '10px' }}
                value={this.props.search}
                onChange={this.props.handleSearch}
            />
        );
    }
}

export default Search;
