import React from 'react';
import { connect } from 'react-redux';

import { gotoNext } from '../actions';

class SlideContainer extends React.Component {

    render () {
        return (
            <article>
                {React.cloneElement(this.props.children, this.props)}
            </article>
        );
    }

}

export default connect(state => ({}), dispatch => {
    return {
        gotoNext: () => {
            dispatch(gotoNext());
        }
    };
})(SlideContainer);

