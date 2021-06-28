import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context';
import reimClient from '../../grubdash.client';
import REvent from '../../models/event';


const PendingDHReimburstments: React.FC<unknown> = (props) => {
  const {user, role} = useContext(UserContext);
  const [tabledata, setTableData] = useState<REvent[]>();
   
  const handleApproval = async (event:REvent) => {
    event.status = 'Pending Benefits Coordinator'; 
    const data = await reimClient.put(`/api/v1/reimburstments/updateRequest`, {event});
     
  }
  const handleReject = () => {

  }
  
  // useEffect(() => {
  //   (async function populateTable(): Promise<void> {
  //     if(user) {
  //       const data =  await getUserRequests(currentUser)
  //       setTableData(data)
  //     }
  //   })();
  // },[user])
    const getRein = async () => {
        const data = await reimClient.post<REvent[]>(`/api/v1/reimburstments/pendingrequests` );
        setTableData(data.data);
    };
 const tableRows = tabledata?.map((item: REvent, index) => (
        <tr key={index} >
          <td>{item.getID}</td>
          <td>{item.eventType}</td>
          <td>{item.description}</td>
          <td>{item.location}</td>
          <td>{item.cost}</td>
          {/* <td>{item.eventStartDate}</td>
          <td>{item.eventStartTime}</td> */}
          <td>{item.gradingformat}</td>

          <td><button className="btn btn-success" onClick={() => handleApproval(item)}>Approve</button></td>
          <td><button onClick={handleReject}></button></td>

        </tr>
        
      ));
    

  return (
    <div className="table-responsive">
    <table onClick={getRein} className="table-bordered">
      <thead>
        <tr>
          <th>Event</th>
          <th>Description</th>
          <th>Location</th>
          <th>Cost</th>
          <th>Graded By</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
    </div>


  );
};
export default PendingDHReimburstments;