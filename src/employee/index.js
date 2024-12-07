import { Party } from '../party';

export class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }

  get monthlyCost() {
    return this._monthlyCost;
  }

  get id() {
    return this._id;
  }
}
