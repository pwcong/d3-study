import React from 'react';
import * as d3 from 'd3';

import { buildData } from '@/utils';

import './style.scss';

export default class App extends React.PureComponent {
  xRef: any;
  yRef: any;

  margin = {
    top: 60,
    bottom: 60,
    left: 60,
    right: 60
  };

  rectHeight = 30;
  rectWidth = 30;

  componentDidMount() {
    this.handleDrawXAxis();
    this.handleDrawYAxis();
  }

  handleDrawXAxis = () => {
    const data = buildData(5, {
      precision: 1,
      offset: 0,
      random: {
        min: 0,
        max: 5
      }
    });

    const scaleLinear = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 5])
      .range([0, 250]);

    const svg = d3.select(this.xRef);
    const g = svg
      .append('g')
      .attr('transform', `translate(${this.margin.top}, ${this.margin.left})`);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 20)
      .attr('y', (d, i) => i * this.rectHeight)
      .attr('width', d => scaleLinear(d))
      .attr('height', this.rectHeight - 5)
      .attr('fill', 'blue');

    const xAxis = d3.axisBottom(scaleLinear).ticks(7);
    g.append('g')
      .attr('transform', `translate(20, ${data.length * this.rectHeight})`)
      .call(xAxis);
  };

  handleDrawYAxis = () => {
    const data = buildData(5, {
      precision: 1,
      offset: 0,
      random: {
        min: 0,
        max: 5
      }
    });
    const scaleLinear = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 5])
      .range([0, 250]);

    const svg = d3.select(this.yRef);
    const g = svg
      .append('g')
      .attr('transform', `translate(${this.margin.top}, ${this.margin.left})`);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * this.rectWidth + 10)
      .attr('y', d => 250 - scaleLinear(d))
      .attr('width', this.rectWidth - 5)
      .attr('height', d => scaleLinear(d))
      .attr('fill', 'blue');

    const yAxis = d3
      .axisLeft(
        d3
          .scaleLinear()
          .domain([0, d3.max(data) || 5])
          .range([250, 0])
      )
      .ticks(7);

    svg
      .append('g')
      .attr('transform', `translate(${this.margin.top}, ${this.margin.left})`)
      .call(yAxis);
  };

  render() {
    return (
      <div className="container">
        <svg width="500" height="500" ref={ref => (this.xRef = ref)}></svg>
        <svg width="500" height="500" ref={ref => (this.yRef = ref)}></svg>
      </div>
    );
  }
}
