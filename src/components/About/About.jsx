import React, { Component } from "react";
import UserLinks from "../UserLinks/UserLinks";
import "./About.css";

class About extends Component {
  render() {
    const { config } = this.props;
    return (
      <div className="about">
        <h1>About</h1>
        <p>Name:YopiNoji</p>
        <UserLinks config={config} labeled />
      </div>
    );
  }
}

export default About;
