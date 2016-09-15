import React from 'react';
import { connect } from 'react-redux';

class HomeStandard extends React.Component {

    render () {
        return (
            <article>
                <h1>Today, {this.props.locationStruggling}% of people in {this.props.locationRegion} struggle to pay their rent or mortgage, according to research for <a href="#">Living Home Standard</a>.</h1>
                <button onClick={this.props.gotoNext}>Surely things aren't all bad?</button>
            </article>
        );
    }

}

HomeStandard.slug = 'home-standard';

const stateToProps = state => {
    return {
        locationStruggling: state.locationStruggling,
        locationRegion: state.locationRegion
    };
};

export default connect(stateToProps)(HomeStandard);
