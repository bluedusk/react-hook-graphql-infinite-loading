import React, { useEffect } from "react";

const Repos = ({ entries, loading, onLoadMore }) => {
  useEffect(() => {
    const handleOnScroll = () => {
      let scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      let scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      let clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      let scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      if (scrolledToBottom) {
        onLoadMore();
      }
    };
    window.addEventListener("scroll", handleOnScroll);

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [onLoadMore]);

  if (!entries && loading) return <p>Loading....</p>;
  const repos = entries.edges || [];
  return (
    <ul>
      {repos.map(({ node }, idx) => (
        <li key={idx}>
          <h3>
            {node.name} - {node.owner.login}
          </h3>
          <p>{node.description}</p>
          <a href={node.url}>url</a>
          <p>
            ★ {node.stargazers.totalCount} -
            {node.primaryLanguage && node.primaryLanguage.name}
          </p>
        </li>
      ))}
      {loading && <h2>Loading...</h2>}
    </ul>
  );
};

export default Repos;
