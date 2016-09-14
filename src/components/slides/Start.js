import React from 'react';

export default class Start extends React.Component {

    render () {
        return (
            <article>
                <h1>How have house prices changed in your lifetime?</h1>
                <div onClick={this.props.gotoNext}>Go</div>
            </article>
        );
    }

}
