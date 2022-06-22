import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getAllRecipes, getAllDiets } from '../../redux/reducer/reducer'

describe("Actions", () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ 
    allRecipes: {},
    allDiets:[]
 });

  beforeEach(() => store.clearActions());

  describe("get Recipes", () => {
    it("shoul dispatch with details of all recipes in payload", () => {
      return store.dispatch(getTypes()).then(() => {
        const actions = store.getActions();
        expect(typeof (actions[0].payload)).toBe("object");
      });
    });
  });
  describe("get Diets", () => {
    it("shoul dispatch with details of all diets in payload", () => {
      return store.dispatch(getTypes()).then(() => {
        const actions = store.getActions();
        expect(typeof (actions[0].payload)).toBe("object");
      });
    });
  });
});