import React from 'react';
import { connect } from 'react-redux';

import { formatCurrency, formatNumber, pick, tenures } from '../../utils';

class Tenure extends React.Component {

    getStatement () {
        switch (this.props.tenure) {
            case tenures.HOMEOWNER:
                return (
                    <h1>Home ownership is getting harder for the next generation. More and more people are living in their childhood bedrooms well into their 30s because they can’t afford rent or a mortgage.</h1>
                );
            case tenures.RENTER:
                return (
                    <h1>Renting is getting more expensive – the average rent for a two-bed in your area is {formatCurrency(this.props.locationRentAverage, '0,0')} per month.</h1>
                );
            case tenures.SOCIAL_RENTER:
                return (
                    <h1>Only {formatNumber(this.props.locationSocialHomes)} social homes were built in your area last year. That means there are fewer for those who need them.</h1>
                );
            case tenures.PARENTS:
                return (
                    <h1>You’re not alone – this is a growing trend. More and more people are living in their childhood bedrooms well into their 30s because they can’t afford rent or a mortgage.</h1>
                );
            case tenures.TEMPORARY:
                return (
                    <h1>The lack of affordable housing means that {formatNumber(this.props.locationTempHouseholds)} households are living in temporary accommodation in your area.</h1>
                );
        }
    }

    render () {
        return (
            <article>
                {this.getStatement()}
                <ul>
                    <li><button onClick={this.props.gotoNext}
                        className="button button--cta">
                            Just how many people are struggling?
                        </button>
                    </li>
                    <li><button onClick={this.props.gotoSlide.bind(this, 'future')}
                        className="button button--cta--secondary">
                            Sign the petition
                        </button>
                    </li>
                </ul>
            </article>
        );
    }

}

Tenure.slug = 'tenure';

const stateToProps = state => pick(state, ['locationRentAverage', 'locationSocialHomes', 'locationTempHouseholds', 'tenure']);

export default connect(stateToProps)(Tenure);
