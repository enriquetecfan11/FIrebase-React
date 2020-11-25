import React from "react";
import ReactDOM, { render } from "react-dom";
import "./styles.css";
import FirebaseAuth, { AuthStatusButton } from "./index";

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
