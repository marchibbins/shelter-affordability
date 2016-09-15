import React from 'react';

export default class Progress extends React.Component {

    render () {
        return (
            <h3>{this.props.current + 1} of {this.props.slides.length}</h3>
        );
    }

}
