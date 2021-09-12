import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ROUTES } from "../constants";

import SeatCount from "./SeatCount";
import SeatSelection from "./SeatSelection";
import Payment from "./Payment";

import "../common.scss";
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.HOME} component={SeatCount} />
        <Route exact path={ROUTES.SELECT_SEATS} component={SeatSelection} />
        <Route exact path={ROUTES.PAYMENT} component={Payment} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
