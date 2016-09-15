import React from 'react';
import { connect } from 'react-redux';

class Future extends React.Component {

    getBuildsDiff () {
        let diff = this.props.buildsYob - this.props.buildsLastYear;
        return Math.abs(diff) + ' ' + (diff > 0 ? 'more' : 'less');
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.gotoNext();
    }

    render () {
        return (
            <article>
                <h1>We built {this.props.buildsLastYear} homes in the UK last year, {this.getBuildsDiff()} than in {this.props.yob} when you were born.</h1>
                <h2>Please sign our petition to demand that Theresa May and her government start building the homes we all urgently need.</h2>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>First name</label>
                    <input type="text" name="firstname"/>
                    <label>Last name</label>
                    <input type="text" name="lastname"/>
                    <label>Email</label>
                    <input type="email" name="email"/>
                    <input type="submit" value="Sign our petition"/>
                </form>
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
