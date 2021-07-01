import fs from 'fs/promises';
import UserRepo from '../repo/userRepo';
import Employee from '../models/employee';

class EmployeeService {
  async addPendingAmount(user:Employee): Promise<boolean> {
    return this.Employees.addPendingAmount(user);
  }

  public currentEmployee?: Employee;

  constructor(
    private Employees = UserRepo,
  ) { }

  public getCurrentEmployee(): Employee | undefined {
    return this.currentEmployee;
  }

  async addAwardedAmount(user:Employee): Promise<boolean> {
    return this.Employees.addAwardedAmount(user);
  }

  public async findByEmployeename(Employeename: string): Promise<Employee | undefined> {
    return this.Employees.queryUser(Employeename);
  }

  async register(employee: Employee): Promise<boolean> {
    return this.Employees.newEmployee(employee);
  }

  public async login(username: string, password: string): Promise<Employee | boolean> {
    // const user = new Employee(username, password);
    const found = await this.findByEmployeename(username);
    // console.log(found);
    if(!found || found.password !== password) {
      return false;
    }
    return found;
  }

  logout(): void {
    this.currentEmployee = undefined;
  }
}

export default new EmployeeService();
