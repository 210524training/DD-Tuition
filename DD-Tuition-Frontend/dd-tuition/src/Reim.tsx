import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import reimClient from './grubdash.client';
import REvent from './models/event';
import logger from 'log4js';
import UserContext from './context';
const ReimRequest: React.FC<unknown> = (props) => {

  
  const [RType, setEventType] = useState<string>();
  const [cost, setRawCost] = useState<string>();
  const [date, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [gradingFormat, setGradingFormat] = useState<string>();
  const [justification, setJustification] = useState<string>();
  const [approverEmail, setApproverEmail] = useState<string>();
  const {user} = useContext(UserContext);
  const [file, setFile] = useState<File>();
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleEventType = (e: ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value);
  };
  const handleRawCost = (e: ChangeEvent<HTMLInputElement>) => {
    setRawCost(e.target.value);
  };
  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleGradingFormat = (e: ChangeEvent<HTMLSelectElement>) => {
    setGradingFormat(e.target.value);
  };
  const handleJustification = (e: ChangeEvent<HTMLInputElement>) => {
    setJustification(e.target.value);
  };
  const handleApproverEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setApproverEmail(e.target.value);
  };
 

  const handleReimSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var reader = new FileReader();

    //Creates reimburstment object and gets the respons then calulates projected amounted
    const response = await reimClient.post<REvent>('/api/v1/reimburstments/', {RType, cost, date, location, description, gradingFormat, justification,user, approverEmail});
    // if (file) {
    //   let formData;
    //   reader.readAsDataURL(file);
    //   reader.onload = async () => {
    //      formData = reader.result;
    //      const response2 = await reimClient.patch('api/v1/reimburstments/file', {reimID, formData});
    //      console.log('FILE IS SENT: ', response2)
    //   };
    // }
    console.log(response);
    const reimID = response.data;

  }

  return (
    <>
    <div className="">
        <h3>Reimbursement Request</h3>
        <form onSubmit={ handleReimSubmit }>
          <div className="form-group container-sm">
            <div>
              <div>
                <label>Event type:</label>
                <select  onChange={handleEventType} className="form-control" id="inputGroupSelect01">
                  <option selected>Choose...</option>
                  <option value="Seminar">Seminar</option>
                  <option value="University Course">University Course</option>
                  <option value="Certification Prep Class">Certification Prep Class</option>
                  <option value="Certification">Certification</option>
                  <option value="Technical Training">Technical Training</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label> Cost:</label>
                <input className="form-control" onChange={handleRawCost}/>
              </div>
            </div>
            <div>
          
                <label>Start Date:</label>
                <input  type='date' className="form-control" onChange={handleStartDate}/>
              <div className="col-md">

              </div>
            </div>
              <div className="col-md">
                <label>Location:</label>
                <input className="form-control" onChange={handleLocation}/>
              </div>
              <div className="col-md">
                <label>Grading Format:</label>
                <select  onChange={handleGradingFormat} className="form-control" id="inputGroupSelect01">
                  <option selected>Choose...</option>
                  <option value="grade">grade</option>
                  <option value="presentation">presentation</option>
                </select>
              </div>
            <div className="row">
 

            </div>
            <label>Reason:</label>
            <input  className="form-control" onChange={handleJustification}/>
            <label>Description:</label>
            <input className="form-control" onChange={handleDescription}/>
            <br/>
            <div className="custom-file">
            </div>
          </div>
            <br/>
            <input type="submit" className="btn btn-primary" value="Submit"/>
            <label>Attach files:&nbsp;</label>
            <input onChange={handleFile}type="file" />
                            
      </form>
    </div>
    </>
  );
};
export default ReimRequest;