import React from 'react';
import { connect } from 'react-redux';

import { formatCurrency, pick } from '../../utils';

class HousePrices extends React.Component {

    render () {
        let openingStatement = `In ${this.props.yob}`;
        if (this.props.yobAgeReplacement) {
            openingStatement = `When you were ${this.props.yobAgeReplacement} years old`;
        }
        return (
            <article>
                <h3 className="slide__title">
                    {openingStatement}, the average cost
                    of a three-bedroom house in the UK
                    was {formatCurrency(this.props.yobAverageHousePrice, '0,0')}.</h3>
                <h3 className="slide__title">
                    Today, it's shot up to {formatCurrency(this.props.todayAverageHousePrice, '0,0')}.</h3>
                <button onClick={this.props.gotoNext} className="button button--cta">
                    What's the got to do with the price of milk?
                </button>
            </article>
        );
    }

}

HousePrices.slug = 'house-prices';

const stateToProps = state => pick(state, ['yob', 'yobAgeReplacement', 'yobAverageHousePrice', 'todayAverageHousePrice']);

export default connect(stateToProps)(HousePrices);
