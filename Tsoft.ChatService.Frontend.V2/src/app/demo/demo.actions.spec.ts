import * as fromDemo from './demo.actions';

describe('loadDemos', () => {
  it('should return an action', () => {
    expect(fromDemo.loadDemos().type).toBe('[Demo] Load Demos');
  });
});
