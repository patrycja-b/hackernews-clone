import React from "react";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Link = ({ link, index, updateCacheAfterVote }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [addVote] = useMutation(VOTE_MUTATION, {
    update(cache, { data: { vote } }) {
      updateCacheAfterVote(cache, vote, link.id);
    },
  });

  const voteForLink = () => {
    addVote({ variables: { linkId: link.id } }).catch((err) =>
      console.log(err)
    );
  };

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div className="ml1 gray f11" onClick={voteForLink}>
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div className="f6 lh-copy gray">
          {link.votes ? link.votes.length : []} votes | by{" "}
          {link.postedBy ? link.postedBy.name : "Unknown "}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Link;

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;
