import React from 'react';
import { connect } from 'react-redux';

import { pick } from '../../utils';

class HomeStandard extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            showDescription: false
        };
    }

    toggleDescription (event) {
        event.preventDefault();
        this.setState({
            showDescription: !this.state.showDescription
        });
    }

    render () {
        if (this.state.showDescription) {
            return (
                <article>
                    <h3 className="slide__title">Living Home Standard</h3>
                    <h4 className="slide__title">The Living Home Standard has been
                        developed by the British public to define what everyone
                        needs from a home in order to live rather than just get by.
                        As part of it, the public have defined acceptable levels of
                        affordability, security and space.</h4>
                    <button onClick={this.toggleDescription.bind(this)} className="button button--cta">
                        Back
                    </button>
                </article>
            );
        } else {
            return (
                <article>
                    <h3 className="slide__title">Today, {this.props.locationStruggling}% of
                        people in {this.props.locationRegion} struggle to pay
                        their rent or mortgage, according to research for
                        the <a href="#" onClick={this.toggleDescription.bind(this)}>
                            Living Home Standard</a>.
                    </h3>
                    <button onClick={this.props.gotoNext} className="button button--cta">
                        How did we end up like this?
                    </button>
                </article>
            );
        }
    }

}

HomeStandard.slug = 'home-standard';

const stateToProps = state => pick(state, ['locationStruggling', 'locationRegion']);

export default connect(stateToProps)(HomeStandard);
