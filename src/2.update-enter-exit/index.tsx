import React from 'react';
import * as d3 from 'd3';

import { buildItems } from '@/utils';

import './style.scss';

export default class App extends React.PureComponent {
  ref: any;

  componentDidMount() {
    // Update
    const p = d3
      .select(this.ref)
      .selectAll('p')
      .data([1, 2, 3, 4, 5])
      .text(d => d);

    // Enter
    p.enter()
      .append('p')
      .text(d => d);

    // Exit
    p.exit().remove();
  }

  render() {
    return (
      <div className="container">
        <div ref={ref => (this.ref = ref)}>{buildItems(8)}</div>
      </div>
    );
  }
}
