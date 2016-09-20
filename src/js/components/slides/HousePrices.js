import React from 'react';
import { connect } from 'react-redux';

import { formatCurrency, pick } from '../../utils';

class HousePrices extends React.Component {

    render () {
        let statement = `In ${this.props.yob}`;
        if (this.props.yobAgeReplacement) {
            statement = `When you were ${this.props.yobAgeReplacement} years old`;
        }
        return (
            <article>
                <h2>{statement}, the average cost of a three-bedroom house in the UK was {formatCurrency(this.props.yobAverageHousePrice, '0,0')}.</h2>
                <h3>Today it's a whopping {formatCurrency(this.props.todayAverageHousePrice, '0,0')}.</h3>
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
