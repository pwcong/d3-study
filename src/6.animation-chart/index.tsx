import React from 'react';
import * as d3 from 'd3';

import { buildData } from '@/utils';

import './style.scss';

export default class App extends React.PureComponent {
  ref: any;

  margin = {
    top: 60,
    bottom: 60,
    left: 60,
    right: 60
  };

  componentDidMount() {
    const data = buildData(8, {
      random: {
        min: 0,
        max: 50
      }
    });
    const svg = d3.select(this.ref);
    const width = parseInt(svg.attr('width'));
    const height = parseInt(svg.attr('height'));

    const g = svg
      .append('g')
      .attr('transform', `translate(${this.margin.top}, ${this.margin.left})`);

    const xScale = d3
      .scaleBand<number>()
      .domain(d3.range(data.length))
      .rangeRound([0, width - this.margin.left - this.margin.right]);

    const xAxis = d3.axisBottom(xScale);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 50])
      .range([height - this.margin.top - this.margin.bottom, 0]);
    const yAxis = d3.axisLeft(yScale);

    const gs = g
      .selectAll('.rect')
      .data(data)
      .enter()
      .append('g')
      .attr('className', 'rect');

    const rectPadding = 20;

    // 绘制矩形
    gs.append('rect')
      .attr('x', (d, i) => (xScale(i) || 0) + rectPadding / 2)
      // .attr('y', d => yScale(d))
      .attr('y', () => yScale(yScale.domain()[0]))
      .attr('width', () => xScale.step() - rectPadding)
      // .attr(
      //   'height',
      //   d => height - this.margin.top - this.margin.bottom - yScale(d)
      // )
      .attr('height', 0)
      .attr('value', d => d)
      .attr('fill', 'blue')
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .ease(d3.easeBackInOut)
      .attr('y', d => yScale(d))
      .attr(
        'height',
        d => height - this.margin.top - this.margin.bottom - yScale(d)
      );

    // 绘制文字
    gs.append('text')
      .attr('x', (d, i) => (xScale(i) || 0) + rectPadding / 2)
      // .attr('y', d => yScale(d))
      .attr('y', () => yScale(yScale.domain()[0]))
      .attr('dx', () => xScale.step() / 2 - rectPadding)
      .attr('dy', 20)
      .text(d => d)
      .attr('fill', 'white')
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .ease(d3.easeBackInOut)
      .attr('y', d => yScale(d));

    g.append('g')
      .attr(
        'transform',
        `translate(0, ${height - this.margin.top - this.margin.bottom})`
      )
      .call(xAxis);
    g.append('g')
      .attr('transform', 'translate(0, 0)')
      .call(yAxis);
  }

  render() {
    return (
      <div className="container">
        <svg width="500" height="500" ref={ref => (this.ref = ref)}></svg>
      </div>
    );
  }
}
