import React from 'react';

export default class SlideBackground extends React.Component {

    render () {
        return (
            <div className={`slide-background ${this.props.slug}`}></div>
        );
    }

}
