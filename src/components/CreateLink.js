import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { FEED_QUERY } from "./LinkList";
import { LINKS_PER_PAGE } from "../constants";

const CreateLink = () => {
  let history = useHistory();
  const [link, setLink] = useState({ url: "", description: "" });
  const [addLink] = useMutation(POST_MUTATION, {
    update(store, { data: { post } }) {
      const first = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = "createdAt_DESC";
      const data = store.readQuery({
        query: FEED_QUERY,
        variables: { first, skip, orderBy },
      });
      data.feed.links.unshift(post);
      store.writeQuery({
        query: FEED_QUERY,
        data,
        variables: { first, skip, orderBy },
      });
    },
    onCompleted() {
      history.push("/new/1");
    },
  });

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={link.description}
          onChange={(e) => setLink({ ...link, description: e.target.value })}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={link.url}
          onChange={(e) => setLink({ ...link, url: e.target.value })}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          addLink({
            variables: link,
          });
          history.push("/");
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateLink;

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
