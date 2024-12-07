import { Employee } from '.';

describe('Employee', () => {
  const employee = new Employee('Kaio', 1, 1000);

  it('should have a name', () => {
    expect(employee.name).toBe('Kaio');
  });

  it('should have an id', () => {
    expect(employee.id).toBe(1);
  });

  it('should have a monthly cost', () => {
    expect(employee.monthlyCost).toBe(1000);
  });

  it('should calculate the annual cost', () => {
    expect(employee.annualCost).toBe(12000);
  });
});
