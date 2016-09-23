import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import SlideBackground from './SlideBackground';
import SlideContainer from './SlideContainer';
import Progress from './Progress';

import { slugs } from '../store';

class App extends React.Component {

    getSlug () {
        return this.props.params.slug || this.props.slides[0].slug;
    }

    render () {
        const slug = this.getSlug();
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="transition"
                    transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {React.createFactory(SlideBackground)({key: slug, slug: slug})}
                </ReactCSSTransitionGroup>
                <main>
                    <SlideContainer slug={slug}>
                        {React.createFactory(
                            this.props.slides[slugs.indexOf(slug)]
                        )()}
                    </SlideContainer>
                </main>
                <Progress slides={this.props.slides} index={slugs.indexOf(slug)}/>
            </div>
        );
    }

}

export default connect(state => state)(App);
