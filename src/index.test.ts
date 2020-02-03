import {helloWorld} from '.';

describe('helloWorld()', () => {
  test('greeting the world', () => {
    expect(helloWorld()).toBe('Hello, World!');
  });
});
