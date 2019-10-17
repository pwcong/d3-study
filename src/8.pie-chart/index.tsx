import React from 'react';
import * as d3 from 'd3';

import { buildData } from '@/utils';

import './style.scss';

export default class App extends React.PureComponent {
  ref: any;

  margin = {
    top: 60,
    left: 60,
    right: 60,
    bottom: 60
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
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const colorScale = d3
      .scaleOrdinal<any, any>()
      .domain(d3.range(data.length))
      .range(d3.schemeCategory10);

    // 新建一个饼状图
    const pie = d3.pie();

    // 新建一个弧形生成器
    const innerRadius = 0;
    const outerRadius = 100;
    const arcGenerator = d3
      .arc<any>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieData = pie(data);

    console.log(pieData);

    const gs = g
      .selectAll('g')
      .data(pieData)
      .enter()
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    gs.append('path')
      .attr('d', d => arcGenerator(d))
      .attr('fill', (d, i) => colorScale(i));

    gs.append('text')
      .text(d => d.data.toString())
      // .attr(
      //   'dx',
      //   d =>
      //     outerRadius * Math.cos((d.startAngle + d.endAngle) / 2 - Math.PI / 2)
      // )
      // .attr(
      //   'dy',
      //   d =>
      //     outerRadius * Math.sin((d.startAngle + d.endAngle) / 2 - Math.PI / 2)
      // )
      .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
      .attr('text-anchor', 'middle');
  }

  render() {
    return (
      <div className="container">
        <svg ref={ref => (this.ref = ref)} width="500" height="500"></svg>
      </div>
    );
  }
}
