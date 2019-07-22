import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN ? (
      <App />
    ) : (
      <h1>
        To run this demo you need to config your access token. Go to readme for
        more information
      </h1>
    )}
  </ApolloProvider>,
  document.getElementById("root")
);
