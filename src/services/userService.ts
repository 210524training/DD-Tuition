import fs from 'fs/promises';
import UserRepo from '../repo/userRepo';
import Employee from '../models/employee';

class EmployeeService {
  public currentEmployee?: Employee;

  constructor(
    private Employees = UserRepo,
  ) { }

  public getCurrentEmployee(): Employee | undefined {
    return this.currentEmployee;
  }

  public async findByEmployeename(Employeename: string): Promise<Employee | undefined> {
    return this.Employees.queryUser(Employeename);
  }

  async register(employee: Employee): Promise<boolean> {
    return this.Employees.newEmployee(employee);
  }

  public async login(username: string, password: string): Promise<Employee | boolean> {
    const found = await this.findByEmployeename(username);
    // console.log(found);
    if(!found || found.password !== password) {
      return false;
    }

    this.currentEmployee = found;
    return found;
  }

  logout(): void {
    this.currentEmployee = undefined;
  }
}

export default new EmployeeService();
