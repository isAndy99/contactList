import { expect } from 'chai';

import tokenize from './tokenize';

describe('Token generator:', () => {
  context('tokenize', () => {
    it('strips leading/trailing spaces', () => {
      const token = tokenize('  truth    ');
      expect(token).to.eql('truth');
    });

    it('returns string without spaces', () => {
      const token = tokenize('the  truth is');
      expect(token).to.eql('thetruthis');
    });

    it('allows "_", "-" characters in name', () => {
      const token = tokenize('the-truth_is');
      expect(token).to.eql('the-truth_is');
    });

    it('returns string without other special characters', () => {
      const token = tokenize('th.e tr#u$,t^/hi@?s');
      expect(token).to.eql('thetruthis');
    });
  });
});
