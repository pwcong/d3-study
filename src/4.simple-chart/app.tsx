import React from 'react';
import * as d3 from 'd3';

import { buildItems } from '@/utils';

import './app.scss';

export default class App extends React.PureComponent {
  ref: any;

  componentDidMount() {
    d3.select(this.ref)
      .selectAll('p')
      .text((d, i) => `Hello World! ${i}`);
  }

  render() {
    return (
      <div className="container">
        <div ref={ref => (this.ref = ref)}>{buildItems(8)}</div>
      </div>
    );
  }
}
