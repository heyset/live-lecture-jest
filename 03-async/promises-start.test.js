const { describe, expect, it } = require('@jest/globals');
const { getGreeting, restartDb, hackTheDb } = require('./promises-start');

// Teste de sucesso

const expectedString = 'Salve! Meu nome é João Corça e minha comida favorita é churrasco.';
const expectedError = new Error('Explodiu');

describe('DONE - A função getGreeting,', () => {
  beforeEach(() => {
    restartDb();
  });

  it('retorna corretamente a string', (done) => {
    getGreeting((person) => person.name === 'João Corça')
      .then((greeting) => {
        expect(greeting).toBe(expectedString);
        done();
      });
  });

  it('retorna o erro correto quando falha', (done) => {
    hackTheDb();
    getGreeting((person) => person.name === 'João Corça')
      .catch((err) => {
        expect(err).toEqual(expectedError);
        done();
      });
  });
});

describe('RETURN + CHAIN A função getGreeting,', () => {
  beforeEach(() => {
    restartDb();
  });

  it('retorna corretamente a string', () => {
    return getGreeting((person) => person.name === 'João Corça')
      .then((greeting) => {
        expect(greeting).toBe(expectedString);
      });
  });

  it('retorna o erro correto quando falha', () => {
    hackTheDb();
    return getGreeting((person) => person.name === 'João Corça')
      .catch((err) => {
        expect(err).toEqual(expectedError);
      });
  });
});

describe('RETURN + RESOLVES/REJECTS A função getGreeting,', () => {
  beforeEach(() => {
    restartDb();
  })

  it('retorna corretamente a string', () => {
    return expect(getGreeting((person) => person.name === 'João Corça')).resolves.toBe(expectedString);
  });
  
  it('retorna o erro correto quando falha', () => {
    hackTheDb();
    return expect(getGreeting((person) => person.name === 'João Corça')).rejects.toEqual(expectedError);
  });
});

describe('ASYNC/AWAIT A função getGreeting,', () => {
  beforeEach(() => {
    restartDb();
  });

  it('retorna corretamente a string', async () => {
    const returnedString = await getGreeting((person) => person.name === 'João Corça');

    expect(returnedString).toBe(expectedString);
  });

  it('retorna o erro correto quando falha', async () => {
    hackTheDb();
    try {
      await getGreeting((person) => person.name === 'João Corça');
    } catch(err) {
      expect(err).toEqual(expectedError);
    }
  });
});
