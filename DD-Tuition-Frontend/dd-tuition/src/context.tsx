import React from 'react';

const UserContext = React.createContext({
  user: '',
  setUser: (u:string) => {},
  balance: 0,
  setBalance: (u:number)=>{},
  role: '',
  setRole: (r:string) => {},
  authenticated: false,
  setAuthenticated: (auth:boolean) => {},
});

export default UserContext;
