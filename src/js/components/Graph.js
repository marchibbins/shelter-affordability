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

        let series = this.props.data[0].values,
            yob = this.props.yobAgeReplacement ? parseInt(this.props.yob, 10) + this.props.yobAgeReplacement : this.props.yob;

        this.start = new Date(series[0][0], 0).getTime();
        this.end = new Date(series[series.length - 1][0], 0).getTime();

        this.peakYear = series.find(year => {
            return year[1] === series.map(t => t[1]).reduce((a, b) => Math.max(a, b));
        })[0];

        this.peakPosition = (new Date(this.peakYear, 0).getTime() - this.start) / (this.end - this.start);
        this.yobPosition = (new Date(yob, 0).getTime() - this.start) / (this.end - this.start);

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize () {
        let width = this.refs.wrapper.offsetWidth;
        if (width !== this.state.width) {
            this.setState({ width });
        }

        let { offsetLeft: yLeft, offsetWidth: yWidth } = this.refs.yobMarker,
            { offsetLeft: pLeft, offsetWidth: pWidth } = this.refs.peakMarker;

        this.setState({
            yobClass: (yLeft >= pLeft) && ((pLeft + pWidth) > yLeft) ? 'offset' : '',
            peakClass: (pLeft > yLeft) && ((yLeft + yWidth) > pLeft) ? 'offset' : ''
        });
    }

    componentDidMount () {
        window.addEventListener('resize', this.handleResize);
        setTimeout(this.handleResize, 10);
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize);
    }

    getColours () {
        return d3.scale.ordinal()
            .domain(['Total'])
            .range(['#ea232d']);
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
                    margins={{top: 10, right: 20, bottom: 45, left: 60}}
                    colors={this.getColours()}
                    xAxisTickInterval={{unit: 'year', interval: this.getTickInterval()}}
                    xAxisLabel='Year'
                    xAccessor={d => new Date(d[0], 0, 1)}
                    xAxisLabelOffset={45}
                    yAxisLabel='New dwellings per year'
                    yAccessor={d => d[1]}
                    yAxisLabelOffset={45}
                    yAxisFormatter={d => `${d / 1000}k`}
                    domain={{y: [0, 500000]}}/>
                <div className="graph-wrapper__labels" style={
                    {width: `${this.state.width - 80}px`
                }}>
                    <div className={'graph-wrapper__marker ' + this.state.peakClass}
                        style={{left: `${this.peakPosition * 100}%`}} ref="peakMarker">
                        Peak {this.peakYear}
                    </div>
                    <div className={'graph-wrapper__marker ' + this.state.yobClass}
                        style={{left: `${this.yobPosition * 100}%`}} ref="yobMarker">
                        Year you were {this.props.yobAgeReplacement ? this.props.yobAgeReplacement : 'born'}
                    </div>
                </div>
            </div>
        );
    }

}
