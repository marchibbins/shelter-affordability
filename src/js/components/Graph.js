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

        this.start = new Date(graphData.map(
                obj => obj.values[0][0])
                    .reduce((a, b) => Math.min(a, b))).getTime(),
        this.end = new Date(graphData.map(
                obj => obj.values[obj.values.length - 1][0])
                    .reduce((a, b) => Math.max(a, b))).getTime(),
        this.yobPosition = (new Date(this.props.yob, 0, 1).getTime() - this.start) / (this.end - this.start);
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
            <div className="graph-wrapper" ref="wrapper">
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
                <div className="graph-wrapper__labels" style={
                    {width: `${this.state.width - 65}px`
                }}>
                    <div className="graph-wrapper__yob" style={{
                        left: `${this.yobPosition * 100}%`
                    }}>Year you were born</div>
                </div>
            </div>
        );
    }

}
