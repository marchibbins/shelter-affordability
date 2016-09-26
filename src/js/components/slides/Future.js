import React from 'react';
import { connect } from 'react-redux';

import Graph from '../Graph';
import Petition from '../forms/Petition';

import { formatNumber, pick } from '../../utils';

import graphData from '../../data/graph.json';

class Future extends React.Component {

    getBuildsDiff () {
        let diff = this.props.buildsYob - this.props.buildsLastYear;
        return formatNumber(Math.abs(diff)) + ' ' + (diff > 0 ? 'more' : 'fewer');
    }

    handleSubmit (event) {
        event.preventDefault();
    }

    render () {
        return (
            <article>
                <h3 className="slide__title">We built {formatNumber(this.props.buildsLastYear)} homes in the UK last
                    year, {this.getBuildsDiff()} than in {this.props.yob} when you were born.</h3>
                <Graph data={graphData} yob={this.props.yob}/>
                <h4 className="slide__title">Please sign our petition to demand that Theresa May and her government start building the homes we all urgently need.</h4>
                <Petition onSuccess={this.props.gotoNext} submitData={{yob: this.props.yob, postcode: this.props.postcode}}/>
            </article>
        );
    }

}

Future.slug = 'future';

const stateToProps = state => pick(state, ['buildsLastYear', 'buildsYob', 'postcode', 'yob']);

export default connect(stateToProps)(Future);
