import React from 'react';
import d3 from 'd3';
import { AreaChart } from 'rd3';

import graphData from '../data/graph.json';

export default class Graph extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            width: 0
        };
    }

    handleResize () {
        let width = this.refs.wrapper.offsetWidth;
        if (width !== this.state.width) {
            this.setState({ width });
        }
    }

    componentDidMount () {
        window.addEventListener('resize', this.handleResize.bind(this));
        this.handleResize();
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    getColours () {
        return d3.scale.ordinal()
            .domain(['Local authorities', 'Private market', 'Housing associations'])
            .range(['#000000', '#ea232d', '#cccccc']);
    }

    getTick () {
        // TODO: Determine breakpoints and intervals
        const breakpoint = 400;
        return {
            unit: 'year',
            interval: this.state.width > breakpoint ? 2 : 4
        };
    }

    render () {
        return (
            <div className="chart-wrapper" ref="wrapper">
                <AreaChart
                    data={graphData}
                    width={this.state.width}
                    height={this.state.width * .75}
                    colors={this.getColours()}
                    xAxisTickInterval={this.getTick()}
                    xAxisLabel="Year"
                    xAccessor={d => new Date(d[0])}
                    yAxisLabel="New dwellings per year"
                    yAccessor={d => d[1]}
                    domain={{y: [0,60]}}/>
            </div>
        );
    }

}
