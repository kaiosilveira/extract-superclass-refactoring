import { Party } from '.';

describe('Party', () => {
  it('should have a name', () => {
    const party = new Party('Party');
    expect(party.name).toBe('Party');
  });

  it('should calculate the annual cost', () => {
    const party = new Party('Party');
    party.monthlyCost = 1000;
    expect(party.annualCost).toBe(12000);
  });
});
