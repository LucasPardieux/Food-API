const { Recipe, Diet, conn } = require('../../src/db.js');
const { expect } = require('chai');

const recipe = {
  title:"Milanesa a la napolitana", summary:"Filete de res empanizado, fritado en aceite y untado en salsa y queso con rebanadas de tomate", healthScore:30
};

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
  });
  describe("Recipe model", () => {
    it("should throw error if strength is not a string", () => {
      Recipe.create({
        title:"Milanesa a la napolitana", summary:"Filete de res empanizado, fritado en aceite y untado en salsa y queso con rebanadas de tomate", healthScore:"Fourty"
      })
        .then(() => done(new Error("healthScore must be a integer")))
        .catch(() => done());
    });
    it('should work when its a valid Health score', () => {
      Recipe.create({
        title:"Milanesa a la napolitana", summary:"Filete de res empanizado, fritado en aceite y untado en salsa y queso con rebanadas de tomate", healthScore:30
      });
    });
  })
});
describe('Diet model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => conn.sync({ force: true }));
    describe('title', () => {
      it('should throw an error if title is null', (done) => {
        Diet.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Diet.create({
          name: "moon diet"
        });
      });
    });
  });
});
