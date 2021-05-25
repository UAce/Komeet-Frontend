import React from 'react';
import 'antd/dist/antd.css'

import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateEventForm from './components/CreateEventForm/CreateEventForm';
import About from './components/About/About';
import Updates from './components/Updates/Updates';
import NotFound from './components/NotFound/NotFound';
import AppLayout from './components/AppLayout/AppLayout';


interface AppProps { }
const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route path='/' component={CreateEventForm} exact />
          <Route path='/about' component={About} exact />
          <Route path='/updates' component={Updates} exact />
          {/* <Route path='/event/:id' component={Event} exact /> */}
          {/* 404 Catch all */}
          {/* <Route path='/' render={() => <div>404</div>} /> */}
          <Route path='/' component={NotFound} />
        </Switch>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
