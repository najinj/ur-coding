import React from "react";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import apiData from "./data";
import { Unwrapped as UnwrappedRepositoryList } from "../src/components/RepositoryList";

configure({ adapter: new Adapter() });

test("RepositoryList renders correctly", () => {
  const mockGetDatafn = jest.fn();
  const component = shallow(
    <UnwrappedRepositoryList
      repos={apiData.items}
      page={1}
      getData={mockGetDatafn}
    />
  );
  expect(toJson(component)).toMatchSnapshot();
});

test("RepositoryList doesn't breack when params are missing", () => {
  const component = shallow(<UnwrappedRepositoryList />);
  expect(toJson(component)).toMatchSnapshot();
});

test("RepositoryList doesn't render elements when data is empty", () => {
  const component = shallow(<UnwrappedRepositoryList repos={[]} />);
  expect(component.find(".repo-container")).toHaveLength(0);
});
