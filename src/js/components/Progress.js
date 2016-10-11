import React from 'react';

export default class Progress extends React.Component {

    render () {
        return (
            <ol className={'unbulleted slide-progress '
                    + (this.props.index === this.props.slides.length - 1 ? 'hide' : '')}>
                {this.props.slides.map((slide, i) => {
                    return (
                        <li key={i} className={'slide-progress__dot ' + (i <= this.props.index ? 'active' : '')}></li>
                    );
                })}
            </ol>
        );
    }

}
