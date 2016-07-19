import {assert} from 'chai';
import ArrayLooper from './index';

describe('ArrayLooper', () => {
  describe('#getNextItem', () => {
    it('should return successive items from an array, looping to the beginning', () => {
      const looper = new ArrayLooper([1, 2, 3]);
      assert.equal(looper.getNextItem(), 1);
      assert.equal(looper.getNextItem(), 2);
      assert.equal(looper.getNextItem(), 3);
      assert.equal(looper.getNextItem(), 1);
      assert.equal(looper.getNextItem(), 2);
      assert.equal(looper.getNextItem(), 3);
      assert.equal(looper.getNextItem(), 1);
    });
  });
});
