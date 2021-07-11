import React from 'react';
import './App.css';
import Navbar from './components/NavBarElements';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/index';
import Session from './pages/session';
import Show from './pages/show';
import User from './pages/user';
import Edit from './pages/edit'


function App() {

  return (
    <div className="App">
      <h1>Lets get started with the Lyrios App!</h1>

        <Navbar />
        <Switch>
          <Route path='/session'>
            <Session/>
          </Route>
          <Route path='/show'>
            <Show/>
          </Route>
          <Route path='/user'>
            <User/>
          </Route>
          <Route path ='/edit'>
            <Edit/>
          </Route>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>



    </div>
  );
        }
// function App() {
// return (
// 	<Router>
// 	<Navbar />
// 	<Switch>
// 		<Route path='/' exact component={Home} />
// 		<Route path='/session' component={Session} />
// 		<Route path='/show' component={Show} />
// 		<Route path='/user' component={User} />
// 		{/* <Route path='/team' component={Teams} />
// 		<Route path='/blogs' component={Blogs} />
// 		<Route path='/sign-up' component={SignUp} /> */}
// 	</Switch>
// 	</Router>
// );
// }

export default App;

  // return (


  //   <div className="App">
  //     <h1>Lets get started with the Lyrios App!</h1>
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

