import React from 'react';

export default class ErrorMessage extends React.Component {

    render () {
        return (
            <em className="message">ErrorMessage {this.props.message}</em>
        );
    }

}
