import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';

import App0 from './1.hello-world';
import App1 from './2.update-enter-exit';
import App2 from './3.append-insert-delete';
import App3 from './4.hello-chart';
import App4 from './5.axis-chart';
import App5 from './6.animation-chart';
import App6 from './7.event-chart';
import App7 from './8.pie-chart';
import App8 from './9.tree-chart';

ReactDOM.render(
  <Router>
    <div className="container">
      <div className="navs">
      
        <NavLink exact={true} to="/1.hello-world">
          1.hello-world
        </NavLink>
      

        <NavLink exact={true} to="/2.update-enter-exit">
          2.update-enter-exit
        </NavLink>
      

        <NavLink exact={true} to="/3.append-insert-delete">
          3.append-insert-delete
        </NavLink>
      

        <NavLink exact={true} to="/4.hello-chart">
          4.hello-chart
        </NavLink>
      

        <NavLink exact={true} to="/5.axis-chart">
          5.axis-chart
        </NavLink>
      

        <NavLink exact={true} to="/6.animation-chart">
          6.animation-chart
        </NavLink>
      

        <NavLink exact={true} to="/7.event-chart">
          7.event-chart
        </NavLink>
      

        <NavLink exact={true} to="/8.pie-chart">
          8.pie-chart
        </NavLink>
      

        <NavLink exact={true} to="/9.tree-chart">
          9.tree-chart
        </NavLink>
      
      </div>
      <div className="apps">
      
        <Route exact={true} path="/1.hello-world" component={App0} />
      

        <Route exact={true} path="/2.update-enter-exit" component={App1} />
      

        <Route exact={true} path="/3.append-insert-delete" component={App2} />
      

        <Route exact={true} path="/4.hello-chart" component={App3} />
      

        <Route exact={true} path="/5.axis-chart" component={App4} />
      

        <Route exact={true} path="/6.animation-chart" component={App5} />
      

        <Route exact={true} path="/7.event-chart" component={App6} />
      

        <Route exact={true} path="/8.pie-chart" component={App7} />
      

        <Route exact={true} path="/9.tree-chart" component={App8} />
      
      </div>
    </div>
  </Router>,
  document.getElementById('app')
);