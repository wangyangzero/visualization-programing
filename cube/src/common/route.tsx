import React from 'react';
import { Route } from 'react-router-dom';
import { IRoute } from '../type/route';

/**
 * 将路由配置项渲染为路由
 * @route 路由
 * @index 路由key值
 */
const WithRoutes = (route: IRoute, index: number) => {
  return (
    <Route
      key={index}
      path={route.path}
      exact
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export {
  WithRoutes
}
 