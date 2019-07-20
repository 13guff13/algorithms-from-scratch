import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import App from 'components/App';
import createBrowserHistory from 'history/createBrowserHistory';
export const browserHistory = createBrowserHistory();

ReactDOM.render(
  <Router history={browserHistory}>
    <Switch>
      <Route path="/" component={App}/>
    </Switch>
  </Router>, document.getElementById('app'));
