import React from 'react';
import { connect } from 'react-redux';

class SlideContainer extends React.Component {

    render () {
        return (
            <article>
                {React.cloneElement(this.props.children, this.props)}
            </article>
        );
    }

}

export default connect(state => state, dispatch => {
    return {
        gotoNext: () => {
            dispatch({type: 'next'});
        }
    };
})(SlideContainer);

