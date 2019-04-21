import auth0 from "auth0-js";

const REDIRECT_ON_LOGIN = "redirect_on_login";

// eslint-disable-next-line
// var idToken = null;
// let _accessToken = null;
// var expiresAt = null;
// let _accessToken = null;

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    // this.idToken = null;
    // this.accessToken = null;
    // this.token = {
    //   idToken: null,
    //   expiresAt: null,
    //   accessToken: null
    // };
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // debugger;
        this.setSession(authResult);
        // const redirectLocation =
        //   localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
        //     ? "/"
        //     : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
        window.location = "/";
        // var r = JSON.parse(redirectLocation);
        // debugger;
        // window.location = redirectLocation.pathname;
        // this.history.push(redirectLocation);
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN);
    });
  };

  setSession = authResult => {
    // set the time that the access token will expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    console.log("Token expires at" + expiresAt);

    // debugger;
    // this.token = {
    //   accessToken: authResult.accessToken,
    //   idToken: authResult.idToken,
    //   expiresAt: authResult.expiresIn * 1000 + new Date().getTime()
    // };
    // debugger;
    // _accessToken = authResult.accessToken;
    // console.log("Setting access token: " + _accessToken);
    // this._idToken = authResult.idToken;
    // _idToken = authResult.idToken;
    // this._idToken = authResult.idToken;
    // expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    this.scheduleTokenRenewal();
  };

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    // localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      //returnTo: "http://localhost:3000"
      returnTo: process.env["REACT_APP_AUTH0_RETURN_TO"]
    });
    //console.log("auth.logout finished");
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  getProfile = cb => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };

  // renewToken(cb) {
  //   this.auth0.checkSession({}, (err, result) => {
  //     if (err) {
  //       console.log(`Error: ${err.error} - ${err.error_description}.`);
  //     } else {
  //       this.setSession(result);
  //     }
  //     if (cb) cb(err, result);
  //   });
  // }

  scheduleTokenRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    const delay = expiresAt - Date.now();
    if (delay > 0) setTimeout(() => this.renewToken(), delay);
  }
}
