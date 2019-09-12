import React from "react";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import apiData from "./data";
import RepositoryCard from "../src/components/RepositoryCard";

configure({ adapter: new Adapter() });

test("RepositoryCard renders correctly", () => {
  const repo = apiData.items[0];
  // eslint-disable-next-line react/jsx-props-no-spreading
  const component = shallow(<RepositoryCard {...repo} />);
  expect(toJson(component)).toMatchSnapshot();
});
