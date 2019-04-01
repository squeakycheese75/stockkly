import React from "react";
// import { Card, Button } from "react-bootstrap";
// import LinkedInBadge from "./LinkedInBadge";
import styles from "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className={styles}>
      {/* <Card style={{ width: "95%" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>About me</Card.Title>
          <Card.Text>
            I'm a software engineer and digital nomad. Currently living and
            working from...<s>London</s>, <s>Berlin</s>, <s>Barcelona</s>,
            Chamonix
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card> */}
      <h1>About me:</h1>
      <p>
        I'm a software engineer and digital nomad. Currently living and working
        from...<s>London</s>, <s>Berlin</s>, <s>Barcelona</s>, Chamonix
      </p>
      <p>
        Feel free to <a href="mailto:james_wooltorton@hotmail.com">email</a> me
        with feedback/comments/suggestions.
      </p>
      {/* <Map /> */}
      {/* <LinkedInBadge /> */}
      <p>
        <a href="https://github.com/squeakycheese75">
          <img
            src="./images/github.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="GitHub"
          />{" "}
          version: 1.0.10
        </a>
      </p>
    </div>
  );
};

export default AboutPage;
