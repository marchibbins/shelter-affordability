import React from 'react';

export default class SlideBackground extends React.Component {

    render () {
        return (
            <div className={`slideBackground ${this.props.slug}`}></div>
        );
    }

}
