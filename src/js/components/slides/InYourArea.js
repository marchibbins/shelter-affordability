import React from 'react';
import { connect } from 'react-redux';

import { updateTenure } from '../../actions';
import { pick, tenures } from '../../utils';

class InYourArea extends React.Component {

    handleClick (tenure) {
        this.props.updateTenure(tenure);
        this.props.gotoNext();
    }

    render () {
        return (
            <article>
                <h1>In {this.props.location}, house prices have risen {this.props.locationIncrease}% since you were born.</h1>
                <h2>It's never been harder to buy or rent. Which one best describes you?</h2>
                <ul className="unbulleted">
                {Object.keys(tenures).map(key => {
                    return (
                        <li key={key}>
                            <button onClick={this.handleClick.bind(this, tenures[key])}
                                className="button button--cta">
                                {tenures[key]}
                            </button>
                        </li>
                    );
                })}
                </ul>
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
