import React from 'react';
import d3 from 'd3';
import { AreaChart } from 'rd3';

export default class Graph extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            width: 0,
            peakClass: '',
            yobClass: ''
        };

        this.start = new Date(this.props.data.map(
                obj => obj.values[0][0])
                    .reduce((a, b) => Math.min(a, b))).getTime(),
        this.end = new Date(this.props.data.map(
                obj => obj.values[obj.values.length - 1][0])
                    .reduce((a, b) => Math.max(a, b))).getTime(),

        this.peakYear = 1945;
        this.peakPosition = (new Date(this.peakYear, 0, 1).getTime() - this.start) / (this.end - this.start);
        this.yobPosition = (new Date(this.props.yob, 0, 1).getTime() - this.start) / (this.end - this.start);
    }

    handleResize () {
        let width = this.refs.wrapper.offsetWidth;
        if (width !== this.state.width) {
            this.setState({ width });
        }

        let { offsetLeft: yLeft, offsetWidth: yWidth } = this.refs.yobMarker,
            { offsetLeft: pLeft, offsetWidth: pWidth } = this.refs.peakMarker;

        this.setState({
            yobClass: (yLeft > pLeft) && ((pLeft + pWidth) > yLeft) ? 'offset' : '',
            peakClass: (pLeft > yLeft) && ((yLeft + yWidth) > pLeft) ? 'offset' : ''
        });
    }

    componentDidMount () {
        window.addEventListener('resize', this.handleResize.bind(this));
        setTimeout(this.handleResize.bind(this), 10);
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    getColours () {
        return d3.scale.ordinal()
            .domain(['Local authorities', 'Private market', 'Housing associations'])
            .range(['#000000', '#ea232d', '#cccccc']);
    }

    getTickInterval () {
        if (this.state.width > 500) {
            return 15;
        } else if (this.state.width > 400) {
            return 20;
        } else {
            return 30;
        }
    }

    render () {
        return (
            <div className="graph-wrapper" ref="wrapper">
                <AreaChart
                    data={this.props.data}
                    width={this.state.width}
                    height={this.state.width * .75}
                    colors={this.getColours()}
                    xAxisTickInterval={{unit: 'year', interval: this.getTickInterval()}}
                    xAxisLabel='Year'
                    xAccessor={d => new Date(d[0])}
                    yAxisLabel='New dwellings per year'
                    yAccessor={d => d[1]}
                    domain={{y: [0,60]}}/>
                <div className="graph-wrapper__labels" style={
                    {width: `${this.state.width - 65}px`
                }}>
                    <div className={'graph-wrapper__marker ' + this.state.peakClass}
                        style={{left: `${this.peakPosition * 100}%`}} ref="peakMarker">
                        Peak {this.peakYear}
                    </div>
                    <div className={'graph-wrapper__marker ' + this.state.yobClass}
                        style={{left: `${this.yobPosition * 100}%`}} ref="yobMarker">
                        Year you were born
                    </div>
                </div>
            </div>
        );
    }

}
