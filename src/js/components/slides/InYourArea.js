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
                <h3 className="slide__title">Since 1995 house prices
                in {this.props.location} have risen {Math.round(this.props.locationInflation / 100)} fold.
                    It's only getting harder and harder to rent or buy.</h3>
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

const stateToProps = state => pick(state, ['location', 'locationInflation']);

export default connect(stateToProps, dispatch => {
    return {
        updateTenure: value => {
            dispatch(updateTenure(value));
        }
    };
})(InYourArea);
