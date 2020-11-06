import './style/global.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import rootReducer from './store/reducers/index';
import Dashboard from './views/dashboard/dashboard';
import Search from './views/search/search';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path='/dashboard/:packageName+' component={Dashboard} />
          <Route path='/' component={Search} />
        </Switch>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
