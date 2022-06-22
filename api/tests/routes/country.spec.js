/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
    title:"Milanesa a la napolitana", summary:"Filete de res empanizado, fritado en aceite y untado en salsa y queso con rebanadas de tomate", healthScore:30
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should return 200 if I pass a recipe as a parameter', ()=>{
      agent.get('/recipes?name=Pizza').expect(200)
    });
  });
  describe('GET /recipes/:idRecipe', () => {
    it('should get 200', () =>
      agent.get('/recipes/716426').expect(200)
    ),
    it('should get 400', () =>
      agent.get('/recipes/Nofood').expect(400)
    );
  }),
  describe('POST /recipes', () => {
    it("It responds with 400 if the data required by the DB is not sent", ()=> agent.post("/recipes").send({name:"AnotherName"}).expect(400));
    it("responds with the recipe created", ()=>
    agent
        .post("/recipes")
        .send(recipe)
        .then((res)=>{
          expect(res.body.title).equal("Milanesa a la napolitana");
        }));
  });
  describe('GET /diet', () => {
    it("responds with 200", ()=>
    agent.get('/diet').expect(200)
        );
  });
});
