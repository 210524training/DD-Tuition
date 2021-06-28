import React, { useContext, useState } from 'react';
import UserContext from '../context';
import Employee from '../models/employee';
import ReimRequest from '../Reim';
import ListRein from './ListRein/ListRein';
import PendingDHReimburstments from './PendingDHReimburstments/PendDHApproval';


const EmployPage: React.FC<unknown> = (props) => {
  
    const [username,setusername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const {user, role} = useContext(UserContext);
    return (   
    <div className="container" id='empContainer'>
        <hr />
        <div className="row">
            <div className="col-sm">
                <p>Hello {`${user}`}</p>
            </div>
            <div className="col-sm">
            </div>
        </div>
        <hr />
        <div >
            <div className="col-md">
                <ReimRequest />
            </div>
            <div className="col-md">
            </div>
        </div>
        <hr />
        <div>
            <div className="col-md">
                <ListRein/>
            </div>
        </div>
        <br/>
    {role==='Department Head' &&    
        <div>
            <div className="col-md">
                <PendingDHReimburstments/>
            </div>
            </div>
            
    }    
        <hr />
        
        <div className="row">
            <div className="col-sm">
                <p>I am the head</p>
            </div>
            <div className="col-sm">
            </div>
        </div>

            
    </div>
  );
};
export default EmployPage;