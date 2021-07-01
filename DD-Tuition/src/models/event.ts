export default class REvent {
  public projectedReimbursement: number=0;

  public sendTo: status | undefined;

  public newAmount:number=this.projectedReimbursement;

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
    public rid: string = Math.random().toString(36).substring(7),
  ) {}

  public calcuateProjection() {
    switch (this.eventType) {
    case 'Seminar':
      this.projectedReimbursement = 0.6 * this.cost;
      break;
    case 'University Course':
      this.projectedReimbursement = 0.8 * this.cost;
      break;
    case 'Certification':
      this.projectedReimbursement = 1 * this.cost;
      break;
    case 'Certification Preparation':
      this.projectedReimbursement = 0.75 * this.cost;
      break;
    case 'Technical Training':
      this.projectedReimbursement = 0.9 * this.cost;
      break;
    default:
      this.projectedReimbursement = 0.3 * this.cost;
      break;
    }
  }

  public get getID() : string {
    return this.rid;
  }
}

export type gradingformat = 'Presentation' | 'Grade';
export type eventType = 'University Course'| 'Seminar' | 'Certification' | 'Certification Preparation' | 'Technical Training' | 'Other';
export type status = 'Pending Department Head' | 'Pending Direct Supervisor' | 'Pending Benefits Coordinator' | 'Approved' | 'Rejected'|'Need More Information';
