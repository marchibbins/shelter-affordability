import React from 'react';
import { connect } from 'react-redux';

import { formatCurrency, formatNumber, pick, tenures } from '../../utils';

class Tenure extends React.Component {

    getStatement () {
        switch (this.props.tenure) {
            case tenures.HOMEOWNER:
                return (
                    <div>
                        <h3 className="slide__title">Home ownership is getting harder for
                            the next generation because of high rent and house prices.</h3>
                        <h3 className="slide__title">XX% of working adults ages 20-34
                            in {this.props.location} are living at home with their parents.</h3>
                    </div>
                );
            case tenures.RENTER:
                return (
                    <h3 className="slide__title">Renting is getting more expensive – the average
                        rent for a two-bed in your area
                        is {formatCurrency(this.props.locationRentAverage, '0,0')} per month.</h3>
                );
            case tenures.SOCIAL_RENTER:
                return (
                    <h3 className="slide__title">Only {formatNumber(this.props.locationSocialHomes)} social
                        homes were built in your area last year. That means there are
                        fewer for those who need them.</h3>
                );
            case tenures.PARENTS:
                return (
                    <div>
                        <h3 className="slide__title">You’re not alone – this is a growing trend.</h3>
                        <h3 className="slide__title">XX% of working adults ages 20-34
                            in {this.props.location} are living at home with their parents
                            because of high rent and house prices.</h3>
                    </div>
                );
            case tenures.TEMPORARY:
                return (
                    <h3 className="slide__title">The lack of affordable housing means
                        that {formatNumber(this.props.locationTempHouseholds)} households
                        are living in temporary accommodation in your area.</h3>
                );
        }
    }

    render () {
        return (
            <article>
                {this.getStatement()}
                <ul className="unbulleted">
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

const stateToProps = state => pick(state, ['location', 'locationRentAverage', 'locationSocialHomes', 'locationTempHouseholds', 'tenure']);

export default connect(stateToProps)(Tenure);
