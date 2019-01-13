import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Main from './routes/scenes/main';
import Menu from './routes/interface/menu';


const App = (props) => (
  <Router>
    <div>
      <Menu/>
      <Route exact path='/' component={Main} />
    </div>
  </Router>
)
export default App;
