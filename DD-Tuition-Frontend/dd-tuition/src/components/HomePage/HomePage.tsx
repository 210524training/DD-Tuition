import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './HomePage.css';
import { NavLink, useHistory } from 'react-router-dom';
import reimClient from '../../grubdash.client';
import UserContext from '../../context';
import Employee from '../../models/employee'
type Props = {
 
}

 const HomePage: React.FC<Props> = (props) => {
    // const user = useAppSelector<UserState>(selectUser);
    const [username, setusername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const {setBalance,setUser, setAuthenticated, setRole} = useContext(UserContext);
   const history= useHistory();
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setusername(e.target.value);
    };
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const response = await reimClient.post<Employee>('/', {username, password});
      sessionStorage.setItem('user', JSON.stringify(response));
      sessionStorage.getItem('user');
      console.log(response);
      setAuthenticated(true);
      setRole(response.data.role);
      setBalance(response.data.currentBalance);
      console.log(response); 
      if(username !== undefined) {
         setUser(response.data.username);
      }
      history.push('/employee');
    
   }

    
    return (
       
        <div id="root" className="banner">
           <div className="container">
           <form className= "form-control" onSubmit={handleFormSubmit}>
             <ul>
             <li><label>Username</label><input type="text" onChange={handleUsernameChange}/></li>
             <li><label>Password</label><input type="password" onChange={handlePasswordChange}/></li>
              <input type="submit"/>
              </ul>
              
           </form>

           </div>
           <div>
              <NavLink to="/register">Register</NavLink>
           </div>
        </div>

    );
  };
  export default HomePage;