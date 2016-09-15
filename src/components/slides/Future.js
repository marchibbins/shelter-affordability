import React from 'react';
import { connect } from 'react-redux';

class Future extends React.Component {

    getBuildsDiff () {
        let diff = this.props.buildsYob - this.props.buildsLastYear;
        return Math.abs(diff) + ' ' + (diff > 0 ? 'more' : 'less');
    }

    render () {
        return (
            <article>
                <h1>We built {this.props.buildsLastYear} homes in the UK last year, {this.getBuildsDiff()} than in {this.props.yob} when you were born.</h1>
                <h2>Please sign our petition</h2>
                <button onClick={this.props.gotoNext}>Sign petition</button>
            </article>
        );
    }

}

Future.slug = 'future';

const stateToProps = state => {
    return {
        buildsLastYear: state.buildsLastYear,
        buildsYob: state.buildsYob
    };
};

export default connect(stateToProps)(Future);
