export default class Employee {
    public TotalReimburstment: number=0;

    public PendingReimburstments: number=0;

    public AwardedReimburstments: number=0;

    public balanceCap: number = 1000;

    public email!: string;

    public role: role = 'Employee';

    public currentBalance: number = 0;

    AvailableReimburstment = this.TotalReimburstment * (1000) - this.PendingReimburstments - this.AwardedReimburstments;

    constructor(
    public username: string,
    public password: string,

    ) {}
}

export type role = 'BenCo' | 'Direct Supervisor' | 'Department Head' | 'Employee';
