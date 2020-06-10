import React from "react";

import { Route } from "react-router-dom";

import Navigation from "./navigation";

export interface CustomRouteProps {
  Component: React.ReactType;
  isPrivate: boolean;
  [x: string]: any;
}

function CustomRoute({
  Component,
  isPrivate = false,
  ...rest
}: CustomRouteProps) {
  return (
    <Route
      {...rest}
      render={(renderProps) => {
        return (
          <Navigation>
            <div>
              <Component {...renderProps} />
            </div>
          </Navigation>
        );
      }}
    />
  );
}

export default CustomRoute;
