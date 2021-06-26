import React, { useContext } from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import UserContext from '../../context';
export type Props ={

}
const Navbar: React.FC<Props> = (props) => {
     const {user}  = useContext(UserContext);
     
 return (
<div className="container">
 <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top" id="myNav">
         <div id="nav" className="container-fluid">
             <NavLink className="navbar-brand" to="/">Home</NavLink>
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                 <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarCollapse">
                 <ul className="navbar-nav ms-auto">
                 {!user  ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">{user}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              </>
              ) : (
                         <li className="nav-item">
                             <p>{user}</p>
                         </li>
              )
}
                 </ul>

             </div>
         </div>
     </nav>
    </div>
 )
}
export default Navbar;
