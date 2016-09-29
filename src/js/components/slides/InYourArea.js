import React from 'react';
import { connect } from 'react-redux';

import { updateTenure } from '../../actions';
import { pick, tenures } from '../../utils';

class InYourArea extends React.Component {

    handleClick (tenure) {
        this.props.updateTenure(tenure);
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.gotoNext();
    }

    render () {
        return (
            <article className="slide">
                <h3 className="slide__title">In {this.props.location}, house prices have
                    risen {this.props.locationIncrease} fold since you were born.
                    It’s only getting harder and harder to buy or rent.</h3>
                <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                    <label>What's your housing situation in {this.props.location}?</label>
                    <div className="form__button-list">
                        {Object.keys(tenures).map(key => {
                            return (
                                <button key={key} className="button button--cta"
                                    onClick={this.handleClick.bind(this, tenures[key])}>
                                    {tenures[key]}</button>
                            );
                        })}
                    </div>
                </form>
            </article>
        );
    }

}

InYourArea.slug = 'in-your-area';

const stateToProps = state => pick(state, ['location', 'locationIncrease']);

export default connect(stateToProps, dispatch => {
    return {
        updateTenure: value => {
            dispatch(updateTenure(value));
        }
    };
})(InYourArea);
