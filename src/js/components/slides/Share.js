import React from 'react';
import { connect } from 'react-redux';

import Phone from '../forms/Phone';
import { URLS } from '../../config';
import { pick } from '../../utils';

class Share extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            shared: false
        };
    }

    handleClick () {
        this.setState({
            shared: true
        });
    }

    getContent () {
        const socialMessage = `House prices have risen ${this.props.locationIncrease} since I was born. `
            + 'Find out how expensive they’ve become in your lifetime';

        if (!this.state.shared) {
            return (
                <div>
                    <h4 className="slide__title">With your support, we will send a
                        loud message to the Prime Minister and her government.</h4>
                    <h4 className="slide__title">To help us spread the word about our campaign,
                        please can you share the below with your friends and followers?</h4>

                    <p>{socialMessage}</p>

                    <p><a href={URLS.lhs}>Explore the Living Home Standard</a></p>

                    <ul className="unbulleted">
                        <li>
                            <a href={`https://twitter.com/intent/tweet?text=${socialMessage}&`
                                 + 'url=http://shelter.org.uk/morehomes&via=shelter&related=shelter'}
                                className="button button--cta button--social button--twitter"
                                onClick={this.handleClick.bind(this)} target="_blank">
                                Share on Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/sharer/sharer.php?u="
                                className="button button--cta button--social button--facebook"
                                onClick={this.handleClick.bind(this)} target="_blank">
                                Share on Facebook
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:?body=${socialMessage}`}
                                className="button button--cta button--social"
                                onClick={this.handleClick.bind(this)}>
                                Share via email
                            </a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return <Phone/>;
        }
    }

    render () {
        return (
            <article className="slide">
                <h3 className="slide__title">Thank you.</h3>
                {this.getContent()}
            </article>
        );
    }

}

Share.slug = 'share';
const stateToProps = state => pick(state, ['locationIncrease']);

export default connect(stateToProps)(Share);

