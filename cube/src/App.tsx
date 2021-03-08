import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './routes';
import { WithRoutes } from './common/route';
import { IRoute } from './type/route';

function App() {
  return (
    <Router>
      <div className='container'>
        <Switch>
          {routes.map((route: IRoute, i: number) => {
            return WithRoutes(route, i)
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
