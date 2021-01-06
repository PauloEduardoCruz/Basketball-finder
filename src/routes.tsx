import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/landing'
import EventsMap from './pages/EventsMap'
import Event from './pages/Event'
import CreateEvent from './pages/CreateEvent'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/app" component={EventsMap}></Route>

                <Route path="/event/create" component={CreateEvent}></Route>
                <Route path="/event/:id" component={Event}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;