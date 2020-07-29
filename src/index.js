import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AllUsers from './components/users/allusers'
import About from './components/about/index'
import NotFound from './components/notfound/index'
import { useRoutes, navigate } from 'hookrouter';

import registerServiceWorker from './registerServiceWorker';

const routes = {
  "/": () => <AllUsers />,
  "/about": () => <About/>,
  "/*": () => <NotFound/>
};

const App = () => {
  const routeResult = useRoutes(routes);

  return (
    <div>
      <span style={{cursor: "pointer"}} onClick={() => {navigate('/about')}}> About </span>
      <span style={{ cursor: "pointer" }} onClick={() => { navigate('/')}}> Home </span>
      <div>
        {routeResult}
      </div>
    </div>
  );

}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

registerServiceWorker();
