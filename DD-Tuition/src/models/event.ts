export default class REvent {
  // private projectedReimbursement: number:

  constructor(
    public date: string,
    public time: number,
    public location: string,
    public description: string,
    public cost: number,
    public eventType: eventType,
    public gradingformat: gradingformat,
    public workrelated: string,
    public timeOff: number,
    public status: status,
    public username: string,
    private rid: string = Math.random().toString(36).substring(7),
  ) {}

  public get getID() : string {
    return this.rid;
  }
}

export type gradingformat = 'Presentation' | 'Grade';
export type eventType = 'University Course'| 'Seminar' | 'Certification' | 'Certification Preparation' | 'Technical Training' | 'Other';
export type status = 'Pending Department Head' | 'Pending Direct Supervisor' | 'Pending Benefits Coordinator' | 'Approved' | 'Rejected';
