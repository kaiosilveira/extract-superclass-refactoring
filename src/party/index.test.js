import { Party } from '.';

describe('Party', () => {
  it('should have a name', () => {
    const party = new Party('Party');
    expect(party._name).toBe('Party');
  });
});
