/* eslint-disable no-shadow */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import { arrayOf, shape, func, number } from "prop-types";
import { getData } from "../actions";
import RepositoryCard from "./RepositoryCard";

const mapStateToProps = ({ repos, page }) => ({
  repos,
  page
});

const mapDispatchToProps = dispatch => {
  return {
    getData: (page, dateString) => dispatch(getData(page, dateString))
  };
};

const RepositoryList = ({ page, getData, repos }) => {
  function loadRepos() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const dateString = date.toISOString().split("T")[0];
    getData(page, dateString);
  }

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadRepos();
    }
  }, 100);

  useEffect(() => {
    loadRepos();
  }, []);

  return (
    <ul className="list-group list-group-flush">
      {repos.length === 0
        ? "empty"
        : repos.map(repo => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <RepositoryCard {...repo} key={repo.id} />
          ))}
    </ul>
  );
};
const ConnectedRepositoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryList);

RepositoryList.propTypes = {
  repos: arrayOf(shape),
  getData: func,
  page: number
};
RepositoryList.defaultProps = {
  repos: [],
  page: 0,
  getData: func
};

export const Unwrapped = RepositoryList;
export default ConnectedRepositoryList;
