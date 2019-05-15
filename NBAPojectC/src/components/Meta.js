import React, { Component } from 'react';
import { Statistic } from 'antd';

class Meta extends Component {
    render() {
        return (
            <Statistic
                style={{ float: 'left', paddingBottom: '5px' }}
                valueStyle={{
                    marginTop: -10,
                    textAlign: 'left'
                }}
                title="Players selected"
                value={this.props.length}
                suffix="/ 15"
            />
        );
    }
}

export default Meta;
