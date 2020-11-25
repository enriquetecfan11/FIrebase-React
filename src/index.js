import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import firebase from "./firebaseConfig";
import {
  google_provider,
  fb_provider,
  twitter_provider,
  github_provider
} from "./firebaseConfig";

// import firebase from "./firebase_config";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GithubLoginButton } from "react-social-login-buttons";
import { TwitterLoginButton } from "react-social-login-buttons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class FirebaseAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password2: " ",
      error: " ",
      user_details: null
    };
  }

  login_handler = provider => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var token = result.credential.accessToken;
        var user = result.user;
        this.setState({ user_details: user });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        this.setState({ error: errorMessage });

        // ...
      });
  };

  handle_email_change = e => {
    this.setState({ email: e.target.value });
  };

  handle_password_change1 = e => {
    this.setState({ password1: e.target.value });
  };

  handle_password_change2 = e => {
    this.setState({ password2: e.target.value }, () => {
      if (this.state.password1 !== this.state.password2) {
        this.setState({ error: "passwords do not match" });
      } else if (this.state.password1 === this.state.password2) {
        this.setState({ error: "passwords match" });
      }
    });
  };
  create_new_user = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password1)
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({ error: errorMessage });

        // ...
      });
  };

  sign_in_with_email = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password1)
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({ error: errorMessage });

        // ...
      });
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user_details: user });
      } else {
        this.setState({ user_details: null });
      }
    });
  };
  render() {
    return (
      <div className="w3-margin w3-container">
        <div className="w3-padding email_login w3-round">
          <h2 className="w3-margin"> Register Account </h2>
          <input
            className="w3-input w3-border w3-margin-bottom"
            type="email"
            placeholder="Email"
            onChange={this.handle_email_change}
          />
          <input
            className="w3-input w3-border w3-margin-bottom"
            type="password"
            placeholder="Password"
            onChange={this.handle_password_change1}
          />
          <input
            className="w3-input w3-border w3-margin-bottom"
            type="password"
            placeholder="Re-password"
            onChange={this.handle_password_change2}
          />
          <button className="w3-button w3-teal" onClick={this.create_new_user}>
            Register
          </button>
          {/* ------------------------------ */}
        </div>
        {/* ------------------------------ */}

        <div className="w3-bar-block social_login w3-padding w3-round">
          <h2 className="w3-margin"> Login with email </h2>
          <input
            type="email"
            className="w3-input w3-border w3-margin-bottom"
            placeholder="Email"
            onChange={this.handle_email_change}
          />
          <input
            className="w3-input w3-border w3-margin-bottom"
            type="password"
            placeholder="Password"
            onChange={this.handle_password_change1}
          />
          <button
            className="w3-button w3-teal"
            onClick={this.sign_in_with_email}
          >
            Signin
          </button>
          <h2 className="w3-margin"> Social login </h2>
          <GoogleLoginButton
            iconSize="16px"
            size="34px"
            onClick={() => this.login_handler(google_provider)}
          />

          <FacebookLoginButton
            iconSize="16px"
            size="34px"
            onClick={() => {
              this.login_handler(fb_provider);
            }}
          />

          <GithubLoginButton
            iconSize="16px"
            size="34px"
            onClick={() => {
              this.login_handler(github_provider);
            }}
          />

          <TwitterLoginButton
            iconSize="16px"
            size="34px"
            onClick={() => {
              this.login_handler(twitter_provider);
            }}
          />
        </div>
        <p> {this.state.error} </p>
      </div>
    );
  }
}

class AuthStatusButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user_details: null, loggedin: false };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user_details: user, loggedin: true });
      } else {
        this.setState({ user_details: null, loggedin: false });
      }
    });
  };

  logout = () => {
    firebase.auth().signOut();
    this.setState({ user_details: null, loggedin: false });
  };

  render() {
    return (
      <Router>
        <div>
          {this.state.loggedin ? (
            <button
              className=" w3-bar-item w3-button w3-yellow w3-right"
              onClick={this.logout}
            >
              Logout ({this.state.user_details.email})
            </button>
          ) : (
            <Link
              to={this.props.login_link}
              className="w3-bar-item w3-yellow w3-button w3-hover-yellow w3-round w3-right w3-margin-right"
            >
              Login
            </Link>
          )}
        </div>
      </Router>
    );
  }
}

export { FirebaseAuth as default, AuthStatusButton };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.config = {
      apiKey: "AIzaSyB8bjuXzO2V1fJNKHDvicd6MToB-XJ8gxk",
      authDomain: "test-50a74.firebaseapp.com",
      databaseURL: "https://test-50a74.firebaseio.com",
      projectId: "test-50a74",
      storageBucket: "test-50a74.appspot.com",
      messagingSenderId: "785976169922",
      appId: "1:785976169922:web:987f31cb133ec419"
    };
  }
  render() {
    return (
      <div>
        <div className="w3-bar w3-purple">
          <AuthStatusButton login_link="/login" />
        </div>
        <FirebaseAuth fireBaseConfig={this.config} />
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
