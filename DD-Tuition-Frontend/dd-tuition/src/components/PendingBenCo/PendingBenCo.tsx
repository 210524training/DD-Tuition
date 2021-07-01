import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import UserContext from '../../context';
import reimClient from '../../grubdash.client';
import REvent from '../../models/event';


const PendingBenCo: React.FC<unknown> = (props) => {
  const { user, role } = useContext(UserContext);
  const [tabledata, setTableData] = useState<REvent[]>();
  const [details,setDetails] = useState<boolean>();
  const [text, setText] = useState<String>();
  const [newAmount, setAmount] = useState<number>();  
  const handleApproval = async (event:REvent) => {
    event.status = 'Approved';
    event.projectedReimbursement = newAmount as  number;
    if(event.projectedReimbursement!==newAmount){
      event.newAmount = newAmount as number;
    }

    const data = await reimClient.put(`/api/v1/reimburstments/updateRequest`, {event});
     
  }
  const handleReject = async(event:REvent) => {
    event.status = 'Rejected';
    const data = await reimClient.put(`/api/v1/reimburstments/updateRequest`, {event});
  }
  const handleRequestInfo = async(event: REvent) => {
    event.sendTo = event.status;
    event.status = 'Need More Information';
    event.details = text as string;
    
    const data = await reimClient.put(`/api/v1/reimburstments/updateRequest`, {event});
  }
  const handleChangeAmount = async(e:ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  }
  const handleAmount = async (event:REvent) => {
    if(event.projectedReimbursement!==newAmount)
      await reimClient.put(`api/v1/employee/addCurrentBalance`,{user, event});
    getRein();
  }
    const getRein = async () => {
        const data = await reimClient.post<REvent[]>(`/api/v1/reimburstments/pendingrequests`,{user,role});
        setTableData(data.data);
    };
    const handleCdetails = async (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    }
    const handleDetails = async() => {
      setDetails(true);
    }
 const tableRows = tabledata?.map((item: REvent, index) => (
        <tr key={index} >
          <td>{item.eventType}</td>
          <td>{item.description}</td>
          <td>{item.location}</td>
          <td><input type="number"  onChange={handleChangeAmount}></input></td>
          <td>{item.gradingformat}</td>
          <td>{item.username}</td>
          
          <td>{item.status}</td>

          <td><button className="btn btn-success" onClick={() => handleApproval(item)}>Approve</button></td>
          <td><button className="btn btn-danger" onClick={() => handleReject(item)}>Reject</button></td>
          {details ?  (
              <>
              
                <td><textarea id="details" onChange={handleCdetails}></textarea></td>
                <td><button type="submit" className="btn btn-primary" onClick={()=>handleRequestInfo(item)}>Send</button> </td>
              </>
            ) : (
              <td><button className="btn btn-primary" onClick={handleDetails}>Request More Information</button></td>

            )
}
          
        </tr>
        
      ));
    

  return (
    <div className="">
    <table onClick={getRein} className="table table-responsive">
      <thead>
        <tr>
        <th>Event Type</th>
          <th>Description</th>
          <th>Location</th>
          <th>Cost</th>
          <th>Grading Format</th>
          <th>User</th>
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
export default PendingBenCo;