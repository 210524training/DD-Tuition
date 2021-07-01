import { table } from 'console';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import UserContext from '../../context';
import reimClient from '../../grubdash.client';
import REvent, {status} from '../../models/event';
import logger from 'log4js';
const ListRein: React.FC<unknown> = (props) => {
  const {user, role} = useContext(UserContext);
  const [tabledata, setTableData] = useState<REvent[]>();
  const [tabledata2, setTableData2] = useState<REvent[]>();
  const [balance, setBalance] = useState<number>();
  const [details, setDetails] = useState<string>();
  const handleReject = async (item:REvent) => {
    const event = item;

    await reimClient.delete(`api/v1/reinburstments/${item.rid}`);
    getRein();
  }
  const handleAmount = async (item:REvent) => {
    const event = item as REvent;
    await reimClient.put(`api/v1/employee/addCurrentBalance`,{user, event});
    getRein();
  }
  const handleCdetails = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
  }
  const handleRequestInfo = async(event: REvent) => {
    
    event.status = event.sendTo as status;
    event.details = details as string;
    const data = await reimClient.put(`/api/v1/reimburstments/updateRequest`, {event});
    getRein();
    
  }
    const getRein = async () => {
          const data = await reimClient.post<REvent[]>(`/api/v1/reimburstments/mypendingrequests` );

        setTableData(data.data);
    };
 const tableRows = tabledata?.map((item: REvent, index) => (
        <tr key={index} >
          <td>{item.eventType}</td>
          <td>{item.description}</td>
          <td>{item.location}</td>
          <td>{item.gradingformat}</td>

          <td>{item.cost}</td>

          <td>{item.projectedReimbursement}
          {item.projectedReimbursement!==item.newAmount &&
            <>
              <button onClick={()=>handleAmount(item)}>Approve Change</button>
              <button onClick={()=>handleReject(item)}>Cancel Request</button>
            </>
          }
          </td>
          <td>{item.status}</td>
          {item.status==='Need More Information' && 
            

              <>
              
                <td className="border"><textarea id="details" onChange={handleCdetails}></textarea></td>
                <td><button type="submit" className="btn btn-primary" onClick={()=>handleRequestInfo(item)}>Send</button> </td>
              </>

            

 }  

        </tr>
      ));
    

  return (
    <div className="table-responsive">
    <h1>My Reimburstments</h1>
    <label>Current Balance: {balance}</label>
    <table onClick={getRein} className="table align-middle table-bordered">
      <thead>
        <tr>
          <th>Event Type</th>
          <th>Description</th>
          <th>Location</th>
          <th>Grading Format</th>
          <th>Cost</th>
          <th>Project Refunded</th>
          
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
    </div>


  );
};
export default ListRein;