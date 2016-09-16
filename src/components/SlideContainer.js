import React from 'react';
import { connect } from 'react-redux';

import { gotoNext, gotoSlide } from '../actions';

class SlideContainer extends React.Component {

    render () {
        return (
            <article>
                {React.cloneElement(this.props.children, this.props)}
            </article>
        );
    }

}

export default connect(null, (dispatch, ownProps) => {
    return {
        gotoNext: () => {
            dispatch(gotoNext(ownProps.slug));
        },
        gotoSlide: nextSlug => {
            dispatch(gotoSlide(nextSlug));
        }
    };
})(SlideContainer);

