import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {

  const domain = window._env_.REACT_APP_AUTH0_DOMAIN;
  const clientId = window._env_.REACT_APP_AUTH0_CLIENT_ID;

  console.log(domain);
  console.log(clientId);
  
  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
      <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin}
          onRedirectCallback={onRedirectCallback}
      >
        {children}
      </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;