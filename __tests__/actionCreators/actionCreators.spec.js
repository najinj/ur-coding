import moxios from "moxios";
import { getData } from "../../src/actions";
import { DATA_LOADED } from "../../src/constants/action-types";
import apiData from "../data";

test("get repos from api", done => {
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    getData(1, "2019-08-12")(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: apiData
        })
        .then(() => {
          expect(request.url).toEqual(
            `https://api.github.com/search/repositories?q=created:>2019-08-12&sort=stars&order=desc&per_page=10&page=1`
          );
          expect(dispatchMock).toBeCalledWith({
            type: DATA_LOADED,
            payload: apiData.items
          });
          done();
        });
    });
  });
});
