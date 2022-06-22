import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";

import Create from "../components/CreateRecipe/Create.jsx";

configure({ adapter: new Adapter() });

describe("<Create/>", () => {
    const state = {
        title: "",
        summary: "",
        healthScore: 0,
        analyzedInstructions: [{ number: 0, step: "" }],
        image: "",
        RecipeDiet: [],
        errors: {
            title: "",
            summary: "",
            healthScore: "",
            analyzedInstructions: "",
            image: "",
        },
        disabled: true
    };
    const mockStore = configureStore([thunk]);

    // beforeAll(() => expect(isReact.classComponent(Create)).toBeTruthy());

    describe("structure", () => {
        let create;
        let store = mockStore(state);

        beforeEach(() => {
            create = mount(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/createRecipe"]}>
                        <Create />
                    </MemoryRouter>
                </Provider>
            );
        });
        it("should render a form", () => {
            expect(create.find("form")).toHaveLength(1);
        });
        it('should render a h5 named "Recipe title:*"', () => {
            expect(create.find("h5").at(0).text()).toEqual("Recipe title:*");
        });
        it('should render an input with property "title"', () => {
            expect(create.find('input[name="title"]')).toHaveLength(1);
        });
        it('should render a h5 named "summary:*"', () => {
            expect(create.find("h5").at(1).text()).toEqual("summary:*");
        });
        it('should render an input with property "summary"', () => {
            expect(create.find('input[name="summary"]')).toHaveLength(1);
        });
        it('should render a h5 named "Health score:"', () => {
            expect(create.find("h5").at(2).text()).toEqual("Health score:");
        });
        it('should render an input with property "healthScore"', () => {
            expect(create.find('input[name="healthScore"]')).toHaveLength(1);
        });
    });
});