import React from 'react';

export default class ErrorMessage extends React.Component {

    render () {
        return (
            <em className="message">{this.props.error.message}</em>
        );
    }

}
