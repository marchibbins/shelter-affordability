import React from 'react';
import { connect } from 'react-redux';

import Graph from '../Graph';
import Petition from '../forms/Petition';

import { formatNumber, pick } from '../../utils';

import graphData from '../../data/graph.json';

class Future extends React.Component {

    constructor (props) {
        super(props);
        this.buildsLastYear = graphData[0].values.find(year => year[0] === 2015)[1];
        this.buildsYob = graphData[0].values.find(year => year[0].toString() === this.props.yob)[1];
    }

    getBuildsDiff () {
        let diff = this.buildsYob - this.buildsLastYear;
        return formatNumber(Math.abs(diff)) + ' ' + (diff > 0 ? 'more' : 'fewer');
    }

    handleSubmit (event) {
        event.preventDefault();
    }

    render () {
        return (
            <article>
                <h3 className="slide__title">House-building has been declining for years,
                    which has contributed to prices rocketing. In 2015, we only
                    built {formatNumber(this.buildsLastYear)} homes in the
                    UK – {this.getBuildsDiff()} than in the year you were born.</h3>
                <Graph data={graphData} yob={this.props.yob}/>
                <h4 className="slide__title">Things don’t have to be this way.
                    Join us and call on Theresa May to commit to building more affordable
                    homes that we so desperately need – and making this a key priority
                    for her new government.</h4>
                <Petition onSuccess={this.props.gotoNext} submitData={{yob: this.props.yob, postcode: this.props.postcode}}/>
            </article>
        );
    }

}

Future.slug = 'future';

const stateToProps = state => pick(state, ['postcode', 'yob']);

export default connect(stateToProps)(Future);
