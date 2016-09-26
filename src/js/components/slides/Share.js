import React from 'react';

import Phone from '../forms/Phone';

export default class Share extends React.Component {

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
        if (!this.state.shared) {
            return (
                <div>
                    <h4 className="slide__title">With you support, we will send a strong,
                        loud message to the Prime Minister and her government.</h4>
                    <h4 className="slide__title">To help us spread the word about our campaign,
                        please can you share the below with your friends and followers?</h4>
                    <ul className="unbulleted">
                        <li>
                            <a href="https://twitter.com/intent/tweet?text="
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
                    </ul>
                </div>
            );
        } else {
            return <Phone/>;
        }
    }

    render () {
        return (
            <article>
                <h3 className="slide__title">Thank you.</h3>
                {this.getContent()}
            </article>
        );
    }

}

Share.slug = 'share';
