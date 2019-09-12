/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import { string, number, shape } from "prop-types";

const Container = styled.div`
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Delails = styled.div`
  width: 100%;
  border: 1px solid;
`;

const RepositoryCard = ({
  owner,
  name,
  description,
  stargazers_count,
  open_issues_count,
  updated_at
}) => {
  return (
    <Container className="repo-container">
      <div className="avatar-container">
        <Image src={owner.avatar_url} alt="avatar_url" />
      </div>
      <Delails className="repo-details">
        <h5>{name}</h5>
        <p>{description}</p>
        <div className="repo-rating">
          <div className="repo-stars">
            <span>Stars : {stargazers_count}</span>
          </div>
          <div className="repo-issues">
            <span>Issues : {open_issues_count}</span>
          </div>
          <div className="repo-last-update">
            <span>Submited {updated_at} ago by </span>
          </div>
        </div>
      </Delails>
    </Container>
  );
};

RepositoryCard.propTypes = {
  name: string.isRequired,
  owner: shape(),
  open_issues_count: number,
  description: string,
  stargazers_count: number,
  updated_at: string
};

RepositoryCard.defaultProps = {
  owner: {},
  description: "",
  stargazers_count: 0,
  open_issues_count: 0,
  updated_at: ""
  // I know the github API always sends this , but this just to show case well whatever xD
};

export default RepositoryCard;
