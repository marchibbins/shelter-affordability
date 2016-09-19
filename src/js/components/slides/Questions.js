import React from 'react';

import QuestionsForm from '../forms/Questions';

export default class Questions extends React.Component {

    render () {
        return (
            <article>
                <h1>Before you go anywhere, can you please quickly answer a few questions?</h1>
                <h2>This will really help us understand a bit more about our supporters</h2>
                <QuestionsForm/>
            </article>
        );
    }

}

Questions.slug = 'questions';
