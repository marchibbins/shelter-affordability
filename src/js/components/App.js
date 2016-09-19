import React from 'react';
import { connect } from 'react-redux';

import SlideContainer from './SlideContainer';
import Progress from './Progress';

import { slugs } from '../store';

class App extends React.Component {

    getSlideFromSlug (slug) {
        if (slug) {
            return this.props.slides[slugs.indexOf(slug)];
        } else {
            return this.props.slides[0];
        }
    }

    render () {
        let Slide = React.createFactory(
            this.getSlideFromSlug(this.props.params.slug)
        )();
        return (
            <main>
                <SlideContainer slug={this.props.params.slug}>
                    {Slide}
                </SlideContainer>
                <Progress slides={this.props.slides} index={slugs.indexOf(this.props.params.slug)}/>
            </main>
        );
    }

}

export default connect(state => state)(App);
