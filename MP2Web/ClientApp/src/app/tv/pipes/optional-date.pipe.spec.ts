import { OptionalDatePipe } from './optional-date.pipe';

describe('OptionalDatePipe', () => {
  it('create an instance', () => {
    const pipe = new OptionalDatePipe();
    expect(pipe).toBeTruthy();
  });
});
