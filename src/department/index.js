import { Party } from '../party';

export class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }

  get staff() {
    return this._staff.slice();
  }

  get monthlyCost() {
    return this.staff.map(e => e.monthlyCost).reduce((sum, cost) => sum + cost);
  }

  get headCount() {
    return this._staff.length;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}
