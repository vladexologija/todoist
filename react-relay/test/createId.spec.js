import expect from 'expect';
import createId from '../app/utils/createId';

describe('createId', () => {
  it('should convert a description into a unique id', () => {
    const id1 = createId();
    const id2 = createId();
    expect(id1).toNotEqual(id2);
  })
})
