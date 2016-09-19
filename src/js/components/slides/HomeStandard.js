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
                    <h1>Living Home Standard</h1>
                    <h2>The Living Home Standard has been developed by the British public to define what everyone needs from a home in order to live rather than just get by. As part of it, the public have defined acceptable levels of affordability, security and space.</h2>
                    <button onClick={this.toggleDescription.bind(this)}>Close</button>
                </article>
            );
        } else {
            return (
                <article>
                    <h1>Today, {this.props.locationStruggling}% of people in {this.props.locationRegion} struggle to pay their rent or mortgage, according to research for <a href="#" onClick={this.toggleDescription.bind(this)}>Living Home Standard</a>.</h1>
                    <button onClick={this.props.gotoNext}>Surely things aren't all bad?</button>
                </article>
            );
        }
    }

}

HomeStandard.slug = 'home-standard';

const stateToProps = state => pick(state, ['locationStruggling', 'locationRegion']);

export default connect(stateToProps)(HomeStandard);
