import React from 'react';

import Phone from '../forms/Phone';

export default class ThankYou extends React.Component {

    render () {
        return (
            <article>
                <h1>Thank you</h1>
                <Phone/>
            </article>
        );
    }

}

ThankYou.slug = 'thank-you';
