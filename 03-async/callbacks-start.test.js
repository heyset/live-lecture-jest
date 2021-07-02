const { describe, expect, it } = require('@jest/globals');
const { getGreeting, hackTheDb, restartDb } = require('./callbacks-start');

describe('A função getGreeting', () => {
  beforeEach(() => {
    restartDb();
  });

  it('retorna erro quando falha', (done) => {
    const expectedError = new Error('Explodiu');

    const filter = (person) => person.name === 'Xuxa';

    function callback(err, result) {
      try {
        expect(err).not.toEqual(expectedError);
        done();
      } catch (err) {
        done(err);
      }
    }

    hackTheDb();

    getGreeting(filter, callback);
  });

  it('retorna corretamente a string', () => {
    // const expectedString = 'Oi galerinha! Meu nome é Xuxa e minha comida favorita é algodão doce.';

    // const filter = (person) => person.name === 'Xuxa';

    // function callback(err, result) {
    //   expect(result).toBe(expectedString);
    //   done();
    // }

    // getGreeting(filter, callback);
  });
});
