import React from 'react';

export default class Progress extends React.Component {

    render () {
        return (
            <ul className="unbulleted slide-progress">
                {[...Array(this.props.slides.length).keys()].map(i => {
                    return (
                        <li key={i} className={'slide-progress__dot ' + (i <= this.props.index ? 'active' : '')}></li>
                    );
                })}
            </ul>
        );
    }

}
