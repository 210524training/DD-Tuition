import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import reimClient from '../../grubdash.client';
import { NavLink } from 'react-router-dom';
import UserContext from '../../context';
type Props = {

}
 const Register: React.FC<Props> = (props) => {
    // const user = useAppSelector<UserState>(selectUser);
    const [email, setUsername] = useState<string>();
    const [username,setusername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const { setAuthenticated, setRole, setUser } = useContext(UserContext);
   const UsernameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setusername(e.target.value); 
    };
    const setpassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value); 
    } 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response =  await reimClient.post('/api/v1/users',{username,password});
    }

    return (
        <div id="root" className="banner">
           <div>
            <form className="form-control" onSubmit={handleSubmit}>
                <label>Username</label><input type="text" onChange={UsernameChanged}/>
                <div>
                    <label>Password</label><input type="password" onChange={setpassword}/>
                </div>
                <div>
                    <label>Email</label><input type="email" />
                </div>
                <input type="submit" />
                
            </form>

           </div>
           <div>
              <NavLink to="/register">Register</NavLink>
           </div>
        </div>

    )
  };
  export default Register;