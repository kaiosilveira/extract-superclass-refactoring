import { Department } from '.';
import { Employee } from '../employee';

describe('Department', () => {
  it('should have a name', () => {
    const department = new Department('Engineering', []);
    expect(department.name).toBe('Engineering');
  });

  it('should have a staff', () => {
    const staff = [new Employee('Kaio', 1, 1000), new Employee('Enzo', 1, 1000)];
    const department = new Department('Engineering', staff);
    expect(department.staff).toEqual(staff);
  });

  it('should calculate the total monthly cost', () => {
    const staff = [new Employee('Kaio', 1, 1000), new Employee('Enzo', 1, 1500)];
    const department = new Department('Engineering', staff);
    expect(department.monthlyCost).toBe(2500);
  });

  it('should calculate the head count', () => {
    const staff = [new Employee('Kaio', 1, 1000), new Employee('Enzo', 1, 1500)];
    const department = new Department('Engineering', staff);
    expect(department.headCount).toBe(2);
  });

  it('should calculate the total annual cost', () => {
    const staff = [new Employee('Kaio', 1, 1000), new Employee('Enzo', 1, 1500)];
    const department = new Department('Engineering', staff);
    expect(department.annualCost).toBe(30000);
  });
});
