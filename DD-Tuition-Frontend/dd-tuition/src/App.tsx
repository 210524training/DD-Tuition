import React, { useContext, useState } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
// All Components must import React from 'react' at the top of their module.
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AppRoutes from './router/AppRoutes';
import UserContext from './context';
import Employee from './models/employee';

// There are 2 different kinds of Components: Class & Function
// This Component here is a Function Component
// For Function Components, you can structure them as regular functions or arrow functions
// Note that in TypeScript, the return type is not the same as the variable type of an arrow Function
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<string>('');
  const [role, setRole] = useState('');
  return (
    <>
      <UserContext.Provider value={{ authenticated, setAuthenticated, user, setUser, role, setRole }}>
        <Router>
          <Navbar />
          <div> user is {`${authenticated ? "" : "not"} authenticated`} </div>
          <AppRoutes/>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
