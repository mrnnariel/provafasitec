import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from './pages/Inicio/inicioindex';
import Register from './pages/Register/regindex';
import Principal from './pages/Principal/prindex';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Inicio} />
                <Route path="/registrar" exact component={Register} />
                <Route path="/principal" exact component={Principal} />
            </Switch>
        </BrowserRouter>
    );
}