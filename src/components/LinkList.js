import React from "react";
import Link from "./Link";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const LinkList = () => {
  const { loading, error, data } = useQuery(FEED_QUERY);

  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error</div>;

  const updateCacheAfterVote = (cache, createVote, linkId) => {
    const data = cache.readQuery({ query: FEED_QUERY });

    const votedLink = data.feed.links.find((link) => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    cache.writeQuery({ query: FEED_QUERY, data });
  };

  return (
    <div>
      {data.feed.links.map((link, index) => (
        <Link
          key={link.id}
          link={link}
          index={index}
          updateCacheAfterVote={updateCacheAfterVote}
        />
      ))}
    </div>
  );
};

export default LinkList;

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;
