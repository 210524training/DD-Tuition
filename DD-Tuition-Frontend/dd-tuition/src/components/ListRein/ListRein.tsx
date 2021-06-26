import { table } from 'console';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import UserContext from '../../context';
import reimClient from '../../grubdash.client';
import REvent from '../../models/event';
import logger from 'log4js';
const ListRein: React.FC<unknown> = (props) => {
  const {user, role} = useContext(UserContext);
  const [tabledata, setTableData] = useState<REvent[]>();
   
  

    const getRein = async () => {
         const data = await reimClient.get<REvent[]>(`/api/v1/reinburstments/${user}`);
        setTableData(data.data);
    };
 const tableRows = tabledata?.map((item: REvent, index) => (
        <tr key={index}>
          <td>{item.getID}</td>
          <td>{item.eventType}</td>
          <td>{item.description}</td>
          <td>{item.location}</td>
          <td>{item.cost}</td>
          {/* <td>{item.eventStartDate}</td>
          <td>{item.eventStartTime}</td> */}
          <td>{item.gradingformat}</td>
          {/* <td>{item.comments}</td>
          <td>{item.projectedAmount}</td> */}
        </tr>
      ));
    

  return (
    <div onClick={getRein}>
    <table >
      <thead>
        <tr>
          <th>Urgent</th>
          <th>Submitted</th>
          <th>Event</th>
          <th>Description</th>
          <th>Location</th>
          <th>Cost</th>
          <th>Start Date</th>
          <th>Start Time</th>
          <th>Graded By</th>
          <th>Comments</th>
          <th>Projected Reimbursement</th>
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