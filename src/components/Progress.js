import React from 'react';

export default class Progress extends React.Component {

    render () {
        return (
            <h3>{Math.max(this.props.index + 1, 1)} of {this.props.slides.length}</h3>
        );
    }

}
