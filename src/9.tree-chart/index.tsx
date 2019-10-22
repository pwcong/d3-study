import React from 'react';
import * as d3 from 'd3';

import './style.scss';

export default class App extends React.PureComponent {
  ref: any;

  margin = {
    left: 50,
    top: 50,
    right: 50,
    bottom: 50
  };

  componentDidMount() {
    const svg = d3.select(this.ref);
    const width = parseInt(svg.attr('width'));
    const height = parseInt(svg.attr('height'));

    const g = svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const data = {
      name: '中国',
      children: [
        {
          name: '浙江',
          children: [
            { name: '杭州', value: 100 },
            { name: '宁波', value: 100 },
            { name: '温州', value: 100 },
            { name: '绍兴', value: 100 }
          ]
        },
        {
          name: '广西',
          children: [
            {
              name: '桂林',
              children: [
                { name: '秀峰区', value: 100 },
                { name: '叠彩区', value: 100 },
                { name: '象山区', value: 100 },
                { name: '七星区', value: 100 }
              ]
            },
            { name: '南宁', value: 100 },
            { name: '柳州', value: 100 },
            { name: '防城港', value: 100 }
          ]
        },
        {
          name: '黑龙江',
          children: [
            { name: '哈尔滨', value: 100 },
            { name: '齐齐哈尔', value: 100 },
            { name: '牡丹江', value: 100 },
            { name: '大庆', value: 100 }
          ]
        },
        {
          name: '新疆',
          children: [
            { name: '乌鲁木齐' },
            { name: '克拉玛依' },
            { name: '吐鲁番' },
            { name: '哈密' }
          ]
        }
      ]
    };

    const hierarchyData = d3.hierarchy(data).sum((d: any) => d.value || 0);

    const tree = d3
      .tree()
      .size([
        width - this.margin.left - this.margin.right,
        height - this.margin.top - this.margin.bottom
      ])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    const treeData = tree(hierarchyData);

    const bezierCurveGenerator = d3
      .linkVertical()
      .y(d => d[1])
      .x(d => d[0]);
    // .linkHorizontal()
    // .x(d => d[1])
    // .y(d => d[0]);

    // 绘制边
    const links = treeData.links();
    g.append('g')
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', d =>
        bezierCurveGenerator({
          source: [d.source.x, d.source.y],
          target: [d.target.x, d.target.y]
        })
      )
      .attr('fill', 'none')
      .attr('stroke', '#cccccc')
      .attr('stroke-width', 1);

    // 绘制节点
    const nodes = treeData.descendants();
    const gs = g
      .append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('cursor', 'pointer')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    gs.append('circle')
      .attr('r', 6)
      .attr('fill', 'white')
      .attr('stroke', 'blue')
      .attr('stroke-width', 1);

    gs.append('text')
      .attr('y', -15)
      .attr('fill', 'black')
      .attr('font-size', 12)
      .attr('opacity', 0)
      .attr('transform', 'rotate(0, 0, 0)')
      .text((d: any) => d.data.name);

    gs.on('mouseenter', function() {
      d3.select(this)
        .selectAll('text')
        .transition()
        .duration(300)
        .attr('opacity', 1);
    })
      .on('mouseout', function() {
        d3.select(this)
          .selectAll('text')
          .transition()
          .duration(300)
          .attr('opacity', 0);
      })
      .on('click', d => {
        console.log(d.data);
      });
  }

  render() {
    return (
      <div className="container">
        <svg ref={ref => (this.ref = ref)} width="500" height="500"></svg>
      </div>
    );
  }
}
