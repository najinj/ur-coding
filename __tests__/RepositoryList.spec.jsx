import React from "react";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import puppeteer from "puppeteer";
import "babel-polyfill";
import apiData from "./data";
import { Unwrapped as UnwrappedRepositoryList } from "../src/components/RepositoryList";

configure({ adapter: new Adapter() });

test("RepositoryList renders correctly", () => {
  const mockGetDatafn = jest.fn();
  const component = shallow(
    <UnwrappedRepositoryList
      repos={apiData.items.slice(0,10)}
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
test("RepositoryList renders correct amount of elements on first load", async () => {
    jest.setTimeout(30000);

    const browser = await puppeteer.launch({
       headless: false,
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:9000/',{
      waitUntil: 'networkidle0',
    });    
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.waitForSelector('img');

    const repositories = (await page.$$('.repo-container')).length;   

    await page.waitFor(10000);

    await browser.close();

    expect(repositories).toEqual(10)
});

test("RepositoryList renders new elements on scroll ", async () => {
  
    jest.setTimeout(30000);

    const browser = await puppeteer.launch({
       headless: false,
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:9000/',{
      waitUntil: 'networkidle0',
    });
    
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.waitForSelector('img');

    

    await page.evaluate(_ => {
        window.scrollBy(0, document.body.scrollHeight);               
    });

    await page.waitFor(1000);

    const repositories = await page.$$eval('.repo-container', divs => divs.length);

    await browser.close();

    expect(repositories).toEqual(20)
    
    
})

