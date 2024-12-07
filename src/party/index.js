export class Party {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}
