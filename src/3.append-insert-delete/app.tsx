import React from 'react';
import * as d3 from 'd3';

import { buildData, buildItems } from '@/utils';

import './app.scss';

export default class App extends React.PureComponent {
  ref1: any;
  ref2: any;
  ref3: any;
  ref4: any;

  componentDidMount() {
    d3.select(this.ref1)
      .selectAll('p')
      .data(buildData(3))
      .text(d => d);

    d3.select(this.ref2)
      .selectAll('p')
      .data(buildData(3))
      .insert('p')
      .text(d => `insert: ${d}`);

    d3.select(this.ref3)
      .selectAll('p')
      .data(buildData(6))
      .enter()
      .append('p')
      .text(d => `append: ${d}`);

    d3.select(this.ref4)
      .selectAll('p')
      .data(buildData(3))
      .exit()
      .text(() => 'delete');
  }

  render() {
    return (
      <div className="container">
        <div ref={ref => (this.ref1 = ref)}>{buildItems(3)}</div>
        <p>--------------------------</p>
        <div ref={ref => (this.ref2 = ref)}>{buildItems(3)}</div>
        <p>--------------------------</p>
        <div ref={ref => (this.ref3 = ref)}>{buildItems(3)}</div>
        <p>--------------------------</p>
        <div ref={ref => (this.ref4 = ref)}>{buildItems(6)}</div>
      </div>
    );
  }
}
