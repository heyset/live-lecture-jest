// Este array simula uma coleção em um banco de dados não-relacional.

const db = [
  {
    id: 123,
    name: 'Xuxa',
    favoriteFood: 'algodão doce',
    greeting: 'Oi galerinha!',
  },
  {
    id: 321,
    name: 'João Corça',
    favoriteFood: 'churrasco',
    greeting: 'Salve!',
  },
  {
    id: 404,
    name: 'Faustina O\'Missing',
    favoriteFood: null,
    greeting: 'Oi.',
  },
]

// Esta variável abaixo, juntamente com as duas funções, hackTheDb() e restartDb() permitem controlar a simulação de uma falha.

let shouldFail = false;

function hackTheDb() {
  shouldFail = true;
}

function restartDb() {
  shouldFail = false;
}

// Esta função simula uma função que busca no banco de dados.

function findOne(filter, callback) {
  setTimeout(() => {
    if (shouldFail) {
      return callback(new Error('Explodiu'), null);
    }

    const queryResults = db.find(filter);
    
    callback(null, queryResults);
  }, 300);
}

// Esta função utiliza a função de cima para montar uma string a partir da pessoa usuária recuperada do "banco de dados".

function getGreeting(filter, callback) {
  findOne(filter, function(err, result) {
    if (err) {
      return callback(err, null);
    }

    const { greeting, name, favoriteFood } = result;

    const greetingString = `${greeting} Meu nome é ${name} e minha comida favorita é ${favoriteFood}.`;

    callback(null, greetingString);
  });
}

module.exports = {
  getGreeting,
  hackTheDb,
  restartDb,
}
