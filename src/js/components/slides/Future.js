import React from 'react';
import { connect } from 'react-redux';

import Graph from '../Graph';
import Petition from '../forms/Petition';

import { updateUserData } from '../../actions';
import { arrayFind, formatNumber, pick } from '../../utils';

import graphData from '../../data/graph.json';

class Future extends React.Component {

    constructor (props) {
        super(props);
        arrayFind();
        let yob = this.props.yobAgeReplacement ? parseInt(this.props.yob, 10) + this.props.yobAgeReplacement : this.props.yob;
        this.buildsLastYear = graphData[0].values.find(year => year[0] === 2015)[1];
        this.buildsYob = graphData[0].values.find(year => year[0].toString() === yob.toString())[1];
    }

    getBuildsDiff () {
        let diff = this.buildsYob - this.buildsLastYear;
        return formatNumber(Math.abs(diff)) + ' ' + (diff > 0 ? 'fewer' : 'more');
    }

    handleSubmit (userData) {
        this.props.updateUserData(userData);
        this.props.gotoNext();
    }

    render () {
        return (
            <div className="slide-wrapper">
                <article className="slide">
                    <h3 className="slide__title">Home-building has been declining for years,
                        which has contributed to prices rocketing. In 2015, we only
                        built {formatNumber(this.buildsLastYear)} homes in the
                        UK – {this.getBuildsDiff()} than in the year you
                        were {this.props.yobAgeReplacement ? this.props.yobAgeReplacement : 'born'}.</h3>
                    <Graph data={graphData} yob={this.props.yob} yobAgeReplacement={this.props.yobAgeReplacement}/>
                </article>
                <article className="slide">
                    <h4 className="slide__title">Things don't have to be this way.
                        Join us and call on Theresa May to commit to building more
                        affordable homes that we desperately need – and make this
                        a key priority for her new government.</h4>
                    <Petition onSuccess={this.handleSubmit.bind(this)} submitData={{yob: this.props.yob, postcode: this.props.postcode, price_increase: this.props.yobAverageHousePrice.multiple, tenure: this.props.tenure}}/>
                </article>
            </div>
        );
    }

}

Future.slug = 'future';

const stateToProps = state => pick(state, ['postcode', 'yob', 'yobAgeReplacement', 'yobAverageHousePrice', 'tenure']);

export default connect(stateToProps, dispatch => {
    return {
        updateUserData: email => {
            dispatch(updateUserData(email));
        }
    };
})(Future);
