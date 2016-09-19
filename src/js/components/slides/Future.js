import React from 'react';
import { connect } from 'react-redux';

import Petition from '../forms/Petition';

import { pick } from '../../utils';

class Future extends React.Component {

    getBuildsDiff () {
        let diff = this.props.buildsYob - this.props.buildsLastYear;
        return Math.abs(diff) + ' ' + (diff > 0 ? 'more' : 'less');
    }

    handleSubmit (event) {
        event.preventDefault();
    }

    render () {
        return (
            <article>
                <h1>We built {this.props.buildsLastYear} homes in the UK last year, {this.getBuildsDiff()} than in {this.props.yob} when you were born.</h1>
                <h2>Please sign our petition to demand that Theresa May and her government start building the homes we all urgently need.</h2>
                <Petition onSuccess={this.props.gotoNext} submitData={{yob: this.props.yob, postcode: this.props.postcode}}/>
            </article>
        );
    }

}

Future.slug = 'future';

const stateToProps = state => pick(state, ['buildsLastYear', 'buildsYob', 'postcode', 'yob']);

export default connect(stateToProps)(Future);
