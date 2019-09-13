import axios from "axios";
import { DATA_LOADED, DATA_ERR } from "../constants/action-types";
import apiUrl from "../config";
/* eslint-disable camelcase */
// eslint-disable-next-line import/prefer-default-export
export function getData(page, date) {
  return dispatch => {
    return axios
      .get(
        apiUrl(page, date),
        { Authorization: "Bearer f9dedaab7e97ef1ee3ddd39bef528f541fcb66a9" }
      )
      .then(
        res => {
          dispatch({ type: DATA_LOADED, payload: res.data.items });
        },
        err => {
          dispatch({ type: DATA_ERR, payload: null, err });
        }
      );
  };
}
